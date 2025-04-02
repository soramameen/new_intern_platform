// app/page.tsx
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 relative">
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">インターン生と企業を</span>
                  <span className="block text-indigo-600 xl:inline">
                    つなげるプラットフォーム
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  未来のエンジニアと革新的な企業をマッチング。あなたのキャリアをここから始めましょう。
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      href="/register"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                    >
                      今すぐ登録
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      href="/login"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                    >
                      ログイン
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-gray-100">
          <div className="h-56 w-full sm:h-72 md:h-96 lg:w-full lg:h-full flex items-center justify-center">
            <svg
              className="h-64 w-64 text-indigo-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
              特徴
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              より良いマッチングを実現
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              インターン生と企業の両方にとって、より良い体験を提供します。
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    for companies
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    無料登録で求めている人材を素早く見つけ出す。
                    コストをかけずに、優秀なインターン生を獲得するチャンス。
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div className="ml-16">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    for students
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    簡単登録で、あなたにぴったりのインターンシップを見つけることができます。
                    あこがれの企業からもオファーが届くかも。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 学生の声セクション */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-indigo-600">
              学生の声
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {/* 学生1 */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-20 w-20 rounded-full overflow-hidden bg-gray-100">
                      <Image
                        src="/api/placeholder/100/100"
                        alt="K"
                        width={100}
                        height={100}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      教養義塾大学・26卒
                    </h3>
                    <p className="text-md text-gray-600">Kさん</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    このサービスを通じてIT企業でのインターンが決まりました。実務経験がなく不安でしたが、丁寧な研修制度があり、プログラミングスキルを着実に伸ばすことができました。チームでの開発経験は大学では得られない貴重なものです。今では自信を持ってコードを書けるようになりました。
                  </p>
                </div>
              </div>
            </div>

            {/* 学生2 */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-20 w-20 rounded-full overflow-hidden bg-gray-100">
                      <Image
                        src="/api/placeholder/100/100"
                        alt="Y・H"
                        width={100}
                        height={100}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      ハーハート大学・25卒
                    </h3>
                    <p className="text-md text-gray-600">Hさん</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    海外在住でも参加できるリモートインターンを希望していました。このプラットフォームでは時差を考慮した勤務体制を提案してくれる企業と出会えました。マーケティング部門で実践的なプロジェクトに参加し、国際的な視点を活かした提案ができています。就活にも役立つ経験になっています。
                  </p>
                </div>
              </div>
            </div>

            {/* 学生3 */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-20 w-20 rounded-full overflow-hidden bg-gray-100">
                      <Image
                        src="/api/placeholder/100/100"
                        alt="O"
                        width={100}
                        height={100}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      西京大学・24卒
                    </h3>
                    <p className="text-md text-gray-600">Oさん</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    地方在住でキャリアを築くことに不安がありましたが、このサービスで完全リモートのデザインインターンを見つけることができました。実践的なUI/UXデザインを学び、ポートフォリオも充実させることができています。地方にいながら東京の企業と繋がれる機会をいただき感謝しています。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <p className="text-center text-base text-gray-400">
              &copy; 2025 インターン生・企業マッチングサービス. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
      {/* 固定表示される登録ボタン */}
      <div className="fixed bottom-6 inset-x-0 flex justify-center z-50">
        <Link
          href="/register"
          className="flex items-center justify-center px-8 py-3 shadow-lg border border-transparent text-base font-medium rounded-full text-white bg-indigo-600 bg-opacity-80 hover:bg-opacity-100 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
        >
          今すぐ登録
        </Link>
      </div>
    </div>
  );
}
