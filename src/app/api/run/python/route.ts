import { NextRequest, NextResponse } from 'next/server'
import { exec } from 'child_process'
import { promisify } from 'util'
import fs from 'fs'
import path from 'path'
import os from 'os'

const execAsync = promisify(exec)

export async function POST(req: NextRequest) {
  const { code, tests } = await req.json()
  if (typeof code !== 'string' || typeof tests !== 'string') {
    return NextResponse.json({ passed: false, error: 'code ve tests gerekli' }, { status: 400 })
  }

  const tmpFile = path.join(os.tmpdir(), `codecrafter_${Date.now()}.py`)
  const wrappedCode = `
${code}

# Tests
${tests}
print("ALL_TESTS_PASSED")
`

  try {
    fs.writeFileSync(tmpFile, wrappedCode)
    const { stdout, stderr } = await execAsync(`python "${tmpFile}"`, { timeout: 5000 })
    const output = stdout + stderr
    if (output.includes('ALL_TESTS_PASSED')) {
      return NextResponse.json({ passed: true })
    }
    const errorMatch = output.match(/(?:Traceback|Error|Exception).*/)
    return NextResponse.json({ passed: false, error: errorMatch ? errorMatch[0].trim() : output.trim() || 'Test başarısız' })
  } catch (err: any) {
    return NextResponse.json({ passed: false, error: err.stderr?.trim() || err.message || 'Python çalıştırma hatası' })
  } finally {
    try { if (fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile) } catch {}
  }
}
