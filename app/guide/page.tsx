import { CircleQuestionMark } from "lucide-react";
import Image from "next/image";

const Page = () => {
  return (
    <div className="bg-[url('/images/background.jpg')] min-h-dvh w-dvw flex flex-col">
        <header 
        className="flex flex-col items-center justify-center w-full pt-6 pb-3 bg-[#C1ED86] border-b-2 border-[#93C400] shadow-md"
        >
            <h1 className="flex items-center">
                <Image
                src={"/images/icon.png"}
                alt="ロゴ"
                width={96}
                height={16}
                priority
                />
            </h1>
        </header>

        <main className="bg-stone-50 flex-1 m-4 py-3 px-8 flex flex-col gap-3 max-w-sm">
            <h2 className="flex items-center justify-center gap-2 text-lg font-bold"><CircleQuestionMark />つかいかた</h2>

            <section className="flex flex-col gap-6">
                <div className="flex flex-col items-center border-2 border-[#93C400] rounded-md pb-3">
                    <h3 className="bg-[#93C400] text-white font-bold w-full p-2 text-center">ステップ１</h3>
                    <div className="w-full p-3">
                        <p className="border border-stone-200 rounded-md p-1">まずは『ものがたりをさくせい』をクリック！</p>
                    </div>
                    <div className="px-8">
                        <Image
                        src="/images/guide/step1.png"
                        alt="ステップ１の説明画像"
                        width={400}
                        height={300}
                    />
                    </div>
                </div>

                <div className="flex flex-col items-center border-2 border-[#93C400] rounded-md pb-3">
                    <h3 className="bg-[#93C400] text-white font-bold w-full p-2 text-center">ステップ2</h3>
                    <div className="w-full p-3">
                        <p className="border border-stone-200 rounded-md p-1">ものがたりにつかうたんごをえらんで、『決定ボタン』をクリック！</p>
                    </div>
                    <div className="px-8">
                        <Image
                        src="/images/guide/step2.png"
                        alt="ステップ2の説明画像"
                        width={400}
                        height={300}
                    />
                    </div>
                </div>

                <div className="flex flex-col items-center border-2 border-[#93C400] rounded-md pb-3">
                    <h3 className="bg-[#93C400] text-white font-bold w-full p-2 text-center">ステップ3</h3>
                    <div className="w-full p-3">
                        <p className="border border-stone-200 rounded-md p-1">えらんだたんごをつかってものがたりをつくろう！<br/>これでかんせいなら『これでおしまい』をクリック！<br/>まだつくるなら『つぎへ』をクリック！</p>
                    </div>
                    <div className="px-8">
                        <Image
                        src="/images/guide/step3.png"
                        alt="ステップ3の説明画像"
                        width={400}
                        height={300}
                    />
                    </div>
                </div>

                <div className="flex flex-col items-center border-2 border-[#93C400] rounded-md pb-3">
                    <h3 className="bg-[#93C400] text-white font-bold w-full p-2 text-center">ステップ4</h3>
                    <div className="w-full p-3">
                        <p className="border border-stone-200 rounded-md p-1">さいごに、タイトルとがぞうをえらんでものがたりをさくせい！</p>
                    </div>
                    <div className="px-8">
                        <Image
                        src="/images/guide/step4.png"
                        alt="ステップ4の説明画像"
                        width={400}
                        height={300}
                    />
                    </div>
                </div>
            </section>
        </main>
    </div>
  );
}

export default Page;