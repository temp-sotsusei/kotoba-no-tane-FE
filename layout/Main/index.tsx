"use client";

import Image from "next/image";
import Link from "next/link";
import { GroupedStories } from "@/types";
import CalendarUI from "@/components/CalendarUI";
import { useState, useMemo, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { toDateKey } from "@/hooks/utils/calendarUtils";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

const MAX_DAILY_STORIES = 3;

function StoryCard({ story }) {
  // 1. 初期値は渡されたパス、なければデフォルト画像
  const [imgSrc, setImgSrc] = useState(story.thumbnailPath || '/images/no-image.png');

  // 2. 親から渡される story.thumbnailPath が変わった時に state を更新する
  useEffect(() => {
    setImgSrc(story.thumbnailPath || '/images/no-image.png');
  }, [story.thumbnailPath]);

  return (
    <Image
      src={imgSrc}
      alt={story.storyTitle}
      fill
      className="object-cover"
      style={{ objectPosition: 'center center' }}
      // 3. 画像読み込みエラー（404等）が発生した瞬間に発火
      onError={() => {
        setImgSrc('/images/no-image.png');
      }}
    />
  );
}

type Props = {
  calenderStoryData: GroupedStories;
};

const Main = ({ calenderStoryData }: Props) => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const isLimitReached = false;
  // const isLimitReached = useMemo(() => {
  //   const today = new Date();
  //   const todayKey = toDateKey(today); // 今日の日付キー (例: "2023-10-25")
  //   const todayStories = calenderStoryData[todayKey] || [];
  //   return todayStories.length >= MAX_DAILY_STORIES;
  // }, [calenderStoryData]);

  const handleDateSelection = (date: Date) => {
    setSelectedDate(date);
    console.log("選択された日付:", date);
  };

  // 選択された日付の物語を取得
  const selectedStories = useMemo(() => {
    const dateKey = toDateKey(selectedDate);
    return calenderStoryData[dateKey] || [];
  }, [selectedDate, calenderStoryData]);

  const pagination = {
    clickable: true,
    el: '.swiper-pagination',
  };

  return (
    <div className="bg-[url('/images/background.jpg')] flex flex-col overflow-hidden">
      <header 
        className="relative flex items-center justify-end w-full pt-6 pb-3 bg-[#C1ED86] border-b-2 border-[#93C400] shadow-md px-4"
      >
        
        <h1
          className="absolute left-1/2 transform -translate-x-1/2"
        >
          <Image
            src={"/images/icon.png"}
            alt="ロゴ"
            width={96}
            height={16}
            priority
          />
        </h1>

        <button
          className="h-fit px-2 py-1 bg-[#FF8258] text-white font-bold border-2 border-white text-sm rounded-md z-10"
          onClick={() => router.push('/guide')}
        >
          つかいかた！
        </button>
        
      </header>

      <main className="flex-1 flex flex-col items-center overflow-hidden pt-4 pb-0 px-4">
        {/* カレンダーエリア */}
        <div className="flex-shrink-0">
          <CalendarUI
            eventDates={calenderStoryData}
            onDateSelect={handleDateSelection}
          />
        </div>

        {/* 選択された日付の物語表示エリア */}
        {selectedStories.length > 0 && (
          <div className="flex-1 w-full pt-4 mt-3 mb-3 bg-white/50 flex flex-col items-center justify-start overflow-hidden">
            {/* 選択日表示 */}
            <p className="text-center text-lg font-bold text-gray-700">
              {selectedDate.getFullYear()}年{selectedDate.getMonth() + 1}月{selectedDate.getDate()}日
            </p>

            {/* 物語スライダー */}
            <div className="w-full px-4 my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {selectedStories.map((story) => (
                <div key={story.storyId} className="flex flex-col items-center px-4">
                  {/* 表紙（タイトル帯を同一ラッパーで重ねる） */}
                  <div
                    className="relative w-64 h-88 rounded-lg overflow-hidden shadow-2xl bg-white"
                    onClick={() => router.push(`/story/view/${story.storyId}`)}  
                  >
                    {/* 画像 */}
                    <StoryCard story={story} />

                    {/* タイトル帯（画像の上に被せる） */}
                    <div className="absolute w-full top-8 left-1/2 -translate-x-1/2 z-20 px-6 py-2 shadow-lg bg-gray-300">
                      <p className="text-center font-bold text-sm whitespace-nowrap overflow-hidden text-ellipsis text-white drop-shadow">
                        {story.storyTitle}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {isLimitReached && (
                <div key={'end'} className="flex flex-col items-center px-4">
                  {/* 表紙（タイトル帯を同一ラッパーで重ねる） */}
                  <div
                    className="w-64 h-88 rounded-lg overflow-hidden shadow-2xl flex items-center justify-center bg-gray-400 border-gray-300 border-4"
                  >
                    <span className="font-bold text-xl text-white">
                      もうきょうはおわりだよ！
                    </span>
                  </div>
                </div>
                )}
            </div>
          </div>
        )}
      </main>
      {/* 物語作成ボタン（常時表示の固定CTA） */}
      {isLimitReached ? (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-gray-400 text-white font-bold border-2 border-white shadow-lg z-50 whitespace-nowrap">
          また あしたね！
        </div>
      ) : (
        <Link
          href="/story/word-list/select"
          className="fixed bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-[#93C400] hover:bg-[#7DB300] text-white font-bold border-2 border-white shadow-lg z-50"
        >
          おはなし を つくる！
        </Link>
      )}
    </div>
  );
};

export default Main;
