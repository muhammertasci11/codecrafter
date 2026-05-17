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

  const tmpFile = path.join(os.tmpdir(), `codecrafter_${Date.now()}.java`)
  const className = 'Main'
  const javaCode = `
public class ${className} {
    public static void main(String[] args) {
        try {
            ${tests}
            System.out.println("ALL_TESTS_PASSED");
        } catch(Exception e) {
            System.out.println("TEST_FAILED:" + e.getMessage());
        }
    }
    ${code}
}
`

  try {
    fs.writeFileSync(tmpFile, javaCode)
    await execAsync(`javac "${tmpFile}"`, { timeout: 10000 })
    const javaDir = path.dirname(tmpFile)
    const { stdout, stderr } = await execAsync(`java -cp "${javaDir}" ${className}`, { timeout: 5000 })

    if (stdout.includes('ALL_TESTS_PASSED')) {
      return NextResponse.json({ passed: true })
    }
    const failMatch = stdout.match(/TEST_FAILED:(.*)/)
    return NextResponse.json({ passed: false, error: failMatch ? failMatch[1].trim() : stderr.trim() || 'Test başarısız' })
  } catch (err: any) {
    return NextResponse.json({ passed: false, error: err.stderr?.trim() || err.message || 'Java çalıştırma hatası' })
  } finally {
    try {
      if (fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile)
      const classFile = tmpFile.replace('.java', '.class')
      if (fs.existsSync(classFile)) fs.unlinkSync(classFile)
    } catch {}
  }
}
