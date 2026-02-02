import { NextRequest, NextResponse } from 'next/server';

const RECIPIENT_EMAIL = 'sewon0325@gmail.com';

// Resend 도메인 미검증 시 사용. 검증된 도메인이 있으면 환경변수 RESEND_FROM_EMAIL 로 설정
const DEFAULT_FROM = '월급 루팡 <onboarding@resend.dev>';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { gameName, gameUrl, description } = body;

    if (!gameName || !gameUrl) {
      return NextResponse.json(
        { error: '게임 이름과 URL은 필수입니다.' },
        { status: 400 }
      );
    }

    // 이메일 내용 구성
    const subject = `[월급 루팡] 게임 제보: ${gameName}`;
    const emailBody = `
새로운 게임 제보가 접수되었습니다.

게임 이름: ${gameName}
게임 URL: ${gameUrl}
설명: ${description || '(설명 없음)'}

제보 시간: ${new Date().toLocaleString('ko-KR')}
`;

    const resendApiKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.RESEND_FROM_EMAIL || DEFAULT_FROM;

    // 배포 환경 디버깅: Vercel 로그에서 확인 가능
    if (!resendApiKey) {
      console.warn('[report-game] RESEND_API_KEY가 설정되지 않았습니다. Vercel 대시보드 → Settings → Environment Variables에서 Production에 추가하세요.');
    }

    if (resendApiKey) {
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [RECIPIENT_EMAIL],
          subject,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #ffffff;">
              <h2 style="color: #fbbf24;">새로운 게임 제보</h2>
              <div style="background-color: #1f2937; padding: 20px; border-radius: 8px; margin: 20px 0; color: #ffffff;">
                <p style="color: #ffffff;"><strong style="color: #fbbf24;">게임 이름:</strong> <span style="color: #ffffff;">${gameName}</span></p>
                <p style="color: #ffffff;"><strong style="color: #fbbf24;">게임 URL:</strong> <a href="${gameUrl}" style="color: #93c5fd;">${gameUrl}</a></p>
                <p style="color: #ffffff;"><strong style="color: #fbbf24;">설명:</strong> <span style="color: #ffffff;">${description || '(설명 없음)'}</span></p>
              </div>
              <p style="color: #ffffff; font-size: 12px;">제보 시간: ${new Date().toLocaleString('ko-KR')}</p>
            </div>
          `,
          text: emailBody,
        }),
      });

      if (!resendResponse.ok) {
        const errorData = await resendResponse.json().catch(() => ({}));
        console.error('[report-game] Resend API 실패:', resendResponse.status, JSON.stringify(errorData));
        // 이메일 전송 실패해도 제보는 접수된 것으로 처리 (500 대신 200)
        return NextResponse.json(
          {
            success: true,
            message: '제보가 접수되었습니다. 감사합니다!',
          },
          { status: 200 }
        );
      }

      const resendData = await resendResponse.json();
      console.log('[report-game] 이메일 전송 성공:', resendData.id ?? 'ok');
    } else {
      console.log('[report-game] API 키 없음, 제보만 로그에 기록:', { gameName, gameUrl, description });
    }

    return NextResponse.json(
      {
        success: true,
        message: '제보가 접수되었습니다. 감사합니다!',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing game report:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
      { status: 500 }
    );
  }
}
