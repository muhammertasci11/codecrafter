'use client'

import { useEffect, useRef } from 'react'
import Phaser from 'phaser'
import { MAP_NODES, SECTIONS } from '@/lib/gameData'
import { useGame } from '@/lib/gameState'
import { playClick } from '@/lib/audio'

export default function GameMap() {
  const containerRef = useRef<HTMLDivElement>(null)
  const gameRef = useRef<Phaser.Game | null>(null)
  const game = useGame()

  useEffect(() => {
    if (!containerRef.current || gameRef.current) return

    class MapScene extends Phaser.Scene {
      player!: Phaser.GameObjects.Container
      playerDot!: Phaser.GameObjects.Arc
      playerGlow!: Phaser.GameObjects.Arc
      nodes: Map<string, {
        circle: Phaser.GameObjects.Arc
        text: Phaser.GameObjects.Text
        icon: Phaser.GameObjects.Text
        glow: Phaser.GameObjects.Arc
        ring: Phaser.GameObjects.Arc
      }> = new Map()
      stars: Phaser.GameObjects.Arc[] = []
      connections!: Phaser.GameObjects.Graphics
      pathGlows: Phaser.GameObjects.Arc[] = []

      constructor() {
        super({ key: 'MapScene' })
      }

      create() {
        const w = 800
        const h = 1850
        this.cameras.main.setBackgroundColor('#0a0a1a')

        const bgGlow1 = this.add.circle(400, 300, 300, 0x00d4ff, 0.04)
        const bgGlow2 = this.add.circle(400, 900, 400, 0x7c3aed, 0.04)
        const bgGlow3 = this.add.circle(400, 1500, 350, 0x00d4ff, 0.04)

        for (let i = 0; i < 80; i++) {
          const star = this.add.circle(
            Math.random() * w,
            Math.random() * h,
            Math.random() * 1.5 + 0.5,
            0xffffff,
            Math.random() * 0.4 + 0.1
          )
          this.stars.push(star)
          this.tweens.add({
            targets: star,
            alpha: { from: star.alpha, to: star.alpha * 0.3 },
            duration: 1500 + Math.random() * 3000,
            yoyo: true,
            repeat: -1,
          })
        }

        this.connections = this.add.graphics()

        const nodeArray = [...MAP_NODES]
        for (let i = 0; i < nodeArray.length - 1; i++) {
          const node = nodeArray[i]
          const next = nodeArray[i + 1]
          const isGate = node.id.startsWith('gate-')
          const isActive = !isGate && !node.id.startsWith('start')

          this.connections.lineStyle(isActive ? 3 : 1, 0x00d4ff, isActive ? 0.4 : 0.1)
          this.connections.beginPath()
          this.connections.moveTo(node.x, node.y)
          this.connections.lineTo(next.x, next.y)
          this.connections.strokePath()

          if (isActive && i % 2 === 0) {
            const midX = (node.x + next.x) / 2
            const midY = (node.y + next.y) / 2
            const glow = this.add.circle(midX, midY, 3, 0x00d4ff, 0.5)
            this.pathGlows.push(glow)
            this.tweens.add({
              targets: glow,
              alpha: { from: 0.4, to: 0 },
              duration: 1000,
              yoyo: true,
              repeat: -1,
            })
          }
        }

        MAP_NODES.forEach(node => {
          const isBoss = node.type === 'boss'
          const isSkill = node.type === 'skill'
          const nodeKey = node.challengeId || node.id
          const isDone = isBoss
            ? game.progress.completedBosses.includes(node.id)
            : game.progress.completedChallenges.includes(nodeKey)
          const isGate = node.id.startsWith('gate-')
          const isDemoLocked = !game.isPaid && node.sectionId !== 'basics'

          const sectionIdx = SECTIONS.findIndex(s => s.id === node.sectionId)
          const prevBossId = sectionIdx > 0 ? SECTIONS[sectionIdx - 1].boss.id : null
          const prevBossDone = prevBossId ? game.progress.completedBosses.includes(prevBossId) : true

          const color = isBoss ? 0xef4444 : isSkill ? 0xf59e0b : 0x00d4ff
          const doneColor = 0x22d3ee
          const radius = isBoss ? 22 : isSkill ? 18 : 16

          const ring = this.add.circle(node.x, node.y, radius + 8, 0x00d4ff, 0.07)
            .setStrokeStyle(1, 0x00d4ff, 0.15)

          const glow = this.add.circle(node.x, node.y, radius + 5, isDone ? doneColor : color, 0.15)

          const circle = this.add.circle(node.x, node.y, radius, isDone ? doneColor : color)
            .setStrokeStyle(2, isDone ? 0x22d3ee : 0xffffff, isDone ? 0.9 : 0.3)
            .setInteractive({ useHandCursor: true })

          const icon = this.add.text(node.x, node.y, isBoss ? '👹' : isSkill ? '⭐' : isDone ? '✓' : '', {
            fontSize: isBoss ? '20px' : '16px'
          }).setOrigin(0.5)

          const label = this.add.text(node.x, node.y + radius + 14, node.label, {
            fontSize: '11px',
            color: isDone ? '#22d3ee' : '#64748b',
            fontFamily: 'monospace',
          }).setOrigin(0.5)

          if (isDone) {
            this.tweens.add({
              targets: glow,
              alpha: { from: 0.25, to: 0.05 },
              duration: 1500,
              yoyo: true,
              repeat: -1,
            })
          }

          if (isGate) {
            if (prevBossDone) {
              circle.setAlpha(0.5)
              label.setAlpha(0.6)
              glow.setAlpha(0)
              ring.setAlpha(0)
              icon.setText('→')
            } else {
              circle.setAlpha(0.2)
              label.setAlpha(0.3)
              glow.setAlpha(0)
              ring.setAlpha(0)
              icon.setText('🔒')
            }
          } else if (isDemoLocked) {
            circle.setAlpha(0.3)
            label.setAlpha(0.4)
            glow.setAlpha(0)
            icon.setText('🔒')
            circle.on('pointerdown', () => { game.setView('payment'); playClick() })
            circle.on('pointerover', () => circle.setScale(1.2))
            circle.on('pointerout', () => circle.setScale(1))
          } else if (!isDone && !isBoss && !isSkill && !isGate) {
            const isLocked = !prevBossDone
            if (isLocked) {
              circle.setAlpha(0.3)
              label.setAlpha(0.4)
              glow.setAlpha(0)
              icon.setText('🔒')
            } else {
              circle.on('pointerdown', () => { if (node.challengeId) game.startChallenge(node.challengeId); playClick() })
              circle.on('pointerover', () => circle.setScale(1.2))
              circle.on('pointerout', () => circle.setScale(1))
            }
          } else if (isBoss && !isDone) {
            const sectionAllDone = SECTIONS.find(s => s.boss.id === node.id)
            const sectionChallengesDone = sectionAllDone?.challenges.every(
              c => game.progress.completedChallenges.includes(c)
            )
            if (sectionChallengesDone) {
              circle.on('pointerdown', () => { game.startBoss(node.id); playClick() })
              circle.on('pointerover', () => circle.setScale(1.2))
              circle.on('pointerout', () => circle.setScale(1))
              this.tweens.add({
                targets: [glow, circle],
                alpha: { from: 1, to: 0.6 },
                duration: 800,
                yoyo: true,
                repeat: -1,
              })
            } else {
              icon.setText('🔒')
              circle.setAlpha(0.4)
              glow.setAlpha(0)
            }
          }

          this.nodes.set(node.id, { circle, text: label, icon, glow, ring })
        })

        const lastDoneIdx = [...MAP_NODES].reverse().findIndex(n => {
          const nk = n.challengeId || n.id
          return n.type === 'challenge' && !n.id.startsWith('gate-') && game.progress.completedChallenges.includes(nk)
        })
        const targetIdx = lastDoneIdx >= 0 ? MAP_NODES.length - 1 - lastDoneIdx : 0
        const targetNode = MAP_NODES[Math.min(targetIdx + 1, MAP_NODES.length - 1)]

        this.playerGlow = this.add.circle(targetNode.x, targetNode.y, 14, 0x00d4ff, 0.25)
        this.playerDot = this.add.circle(targetNode.x, targetNode.y, 6, 0x22d3ee)
        const playerRing = this.add.circle(targetNode.x, targetNode.y, 10, 0x00d4ff, 0.15)
        this.player = this.add.container(targetNode.x, targetNode.y, [this.playerGlow, playerRing, this.playerDot])

        this.tweens.add({
          targets: this.playerGlow,
          scale: { from: 1, to: 2 },
          alpha: { from: 0.25, to: 0.02 },
          duration: 1500,
          yoyo: true,
          repeat: -1,
        })
        this.tweens.add({
          targets: playerRing,
          scale: { from: 1, to: 1.5 },
          alpha: { from: 0.15, to: 0.02 },
          duration: 2000,
          yoyo: true,
          repeat: -1,
        })
      }
    }

    gameRef.current = new Phaser.Game({
      type: Phaser.AUTO,
      width: 800,
      height: 1850,
      parent: containerRef.current,
      scene: MapScene,
      backgroundColor: '#0a0a1a',
      scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
    })

    return () => {
      if (gameRef.current) {
        gameRef.current.destroy(true)
        gameRef.current = null
      }
    }
  }, [game])

  return (
    <div className="flex justify-center">
      <div ref={containerRef} className="rounded-xl overflow-hidden shadow-2xl border border-[var(--accent-blue)]/20" />
    </div>
  )
}
