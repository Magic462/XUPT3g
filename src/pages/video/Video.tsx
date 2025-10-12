import './Video.scss';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Tabs from '../../components/Tabs';
// import { getDirection } from '@/services/directions';
import { getVideo } from '@/services/video';
import { CategorizedVideo } from '@/types/video';
import { message } from '@/utils/message';
import sampleVideo from '../../assets/VID_20240815_220604.mp4';

// const fakeData = ['Web', 'Server', 'Android', 'iOS', 'HarmonyOS'];
const Video = () => {
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [allVideos, setAllVideos] = useState<CategorizedVideo[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<string>(null);

  const fetchAllVideos = async () => {
    try {
      const res = await getVideo();
      console.log(res);
      setAllVideos(res);
      const categories = [...new Set(res.map((item) => item.category))];
      if (Array.isArray(categories) && categories.length > 0) {
        setPlatforms(categories);
        setSelectedCategory(categories[0]);
      }
    } catch (err) {
      console.log('获取视频失败：', err);
      message.error('获取视频失败');
    }
  };

  // const fetchSelectedVideo = async (selectedCategory) => {
  //   try {
  //     const res = await getVideo(selectedCategory);
  //     console.log(res);
  //   } catch (err) {
  //     console.log('获取视频失败：', err);
  //     message.error('获取视频失败');
  //   }
  // };

  useEffect(() => {
    fetchAllVideos();
  }, []);

  useEffect(() => {
    if (allVideos.length > 0 && selectedCategory) {
      const res = allVideos.find((item) => item.category === selectedCategory);

      if (res.videos[0].url) {
        setSelectedVideo(res.videos[0].url);
      } else {
        message.error('该分类无视频');
        return;
      }
    }
  }, [selectedCategory, allVideos]);

  return (
    <>
      {allVideos && (
        <>
          {platforms.length > 0 && (
            <Tabs tabs={platforms} onTabChange={setSelectedCategory} />
          )}
          {/* 传入视频 */}
          {selectedVideo ? (
            <div className="video-container">
              <video
                src={sampleVideo}
                controls
                muted
                autoPlay
                playsInline
                loop={true}
                className="video-box"
                onError={() => message.error('视频加载失败')}
              ></video>
            </div>
          ) : (
            <div>暂无视频数据</div>
          )}
        </>
      )}
    </>
  );
};

export default Video;
