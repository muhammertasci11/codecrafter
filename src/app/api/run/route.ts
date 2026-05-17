import { NextRequest, NextResponse } from 'next/server'
import vm from 'vm'

export async function POST(req: NextRequest) {
  const { code, tests } = await req.json()

  if (typeof code !== 'string' || typeof tests !== 'string') {
    return NextResponse.json({ passed: false, error: 'code ve tests gerekli' }, { status: 400 })
  }

  let consoleOutput = ''
  const sandbox = {
    console: {
      log: (...args: any[]) => {
        consoleOutput += args.join(' ') + '\n'
      },
      error: (...args: any[]) => {
        consoleOutput += args.join(' ') + '\n'
      }
    }
  }

  const wrappedCode = `
${code}

try {
  ${tests}
  console.log('ALL_TESTS_PASSED')
} catch(e) {
  console.log('TEST_FAILED:' + e.message)
}
`

  try {
    vm.createContext(sandbox)
    vm.runInContext(wrappedCode, sandbox, { timeout: 2000 })

    if (consoleOutput.includes('ALL_TESTS_PASSED')) {
      return NextResponse.json({ passed: true })
    }

    const failMatch = consoleOutput.match(/TEST_FAILED:(.*)/)
    const error = failMatch ? failMatch[1].trim() : 'Test başarısız'

    return NextResponse.json({ passed: false, error })
  } catch (err: any) {
    return NextResponse.json({
      passed: false,
      error: err.message || 'Kod çalıştırılırken bir hata oluştu.'
    })
  }
}
