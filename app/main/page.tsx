import Main from "@/layout/Main";
import axios from "axios";
import { groupStoriesByDate } from "./storyProcessor";
import { GroupedStories, RawStoryListResponse } from "@/types";
import { getAccessToken } from "@auth0/nextjs-auth0";

async function getStoriesWithAxios(): Promise<RawStoryListResponse | []> {
  try {
    const accessToken = await getAccessToken();

      if (!accessToken) {
          // トークンがない場合、未認証エラーとして処理を中断
          console.error('❌ Authentication Error: Access token not found in server context.');
          // ログインページへのリダイレクトはミドルウェアが担当するため、ここでは空データを返してエラー処理
          return [];
      }
      // 💡 axiosの利点: データは response.data に含まれる
      const response = await axios.get<RawStoryListResponse>(
        "http://localhost:3000/api/story/chapter/stories",
        {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
      );

      console.log('✅ Data fetched successfully (axios):', response.data);
      return response.data;

  } catch (error) {
      // 💡 axiosの利点: 4xx/5xxのエラーもここでキャッチされる
      if (axios.isAxiosError(error)) {
          console.error('❌ Axios Error Status:', error.response?.status);
          console.error('❌ Axios Error Data:', error.response?.data);
      } else {
          console.error('❌ Unknown Error:', error);
      }
      return [];
  }
}

const Page = async () => {
  const rawStories = await getStoriesWithAxios();
  const calendarStoryData: GroupedStories = groupStoriesByDate(rawStories);

  return <Main calenderStoryData={calendarStoryData} />;
};

export default Page;
