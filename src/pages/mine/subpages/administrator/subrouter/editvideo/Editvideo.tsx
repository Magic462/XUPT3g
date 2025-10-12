import './Editvideo.scss';
import { useEffect, useState } from 'react';
import { message } from '@/utils/message';
import { CategorizedVideo } from '@/types/video';
import Upload from 'antd/es/upload';
import type { UploadProps, UploadFile } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { getVideo, postVideo, deleteVideo } from '@/services/video';

const { Dragger } = Upload;

const fakeVideo: CategorizedVideo[] = [
  {
    category: 'AI',
    videos: [
      {
        name: '人工智能训练视频',
        url: 'http://example.com/videos/AI/1633036800.mp4',
      },
    ],
  },
  {
    category: 'VR',
    videos: [
      {
        name: '虚拟现实训练视频',
        url: 'http://example.com/videos/VR/1633036800.mp4',
      },
    ],
  },
  {
    category: 'AR',
    videos: [
      {
        name: '增强现实训练视频',
        url: 'http://example.com/videos/AR/1633036800.mp4',
      },
    ],
  },
];

const Editvideo = () => {
  const [allVideos, setAllVideos] = useState<CategorizedVideo[]>(fakeVideo);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const fetchAllVideos = async () => {
    try {
      const res = await getVideo();
      console.log(res);
      setAllVideos(res);
    } catch (err) {
      console.log('获取视频失败：', err);
      message.error('获取视频失败');
    }
  };

  // 上传类别和视频文件
  const handlerUpload = async () => {
    // 校验类别是否为空
    if (!selectedCategory.trim()) {
      message.error('请先输入视频类别');
      return;
    }

    // 校验文件是否已选择
    if (!selectedFile) {
      message.error('请先选择要上传的视频文件');
      return;
    }

    try {
      setUploading(true);
      message.warning('视频上传中，请稍候...', 0);

      // 调用postVideo接口上传视频
      await postVideo(selectedCategory, selectedFile);

      message.success(`视频「${selectedFile.name}」上传成功`);

      // 重置表单
      setSelectedCategory('');
      setSelectedFile(null);

      // 重新获取视频列表
      await fetchAllVideos();
    } catch (err) {
      console.error('上传视频失败：', err);
      message.error('上传视频失败，请重试');
    } finally {
      setUploading(false);
    }
  };

  // 删除单个视频（根据url）
  const handleDeleteVideo = async (url: string, name: string) => {
    try {
      if (window.confirm(`确定要删除视频「${name}」吗？`)) {
        await deleteVideo(url);
        message.success('视频删除成功');
        // 重新获取视频列表
        await fetchAllVideos();
      }
    } catch (err) {
      console.error('删除视频失败：', err);
      message.error('删除视频失败，请重试');
    }
  };

  useEffect(() => {
    fetchAllVideos();
  }, []);

  // 配置Dragger组件
  const props: UploadProps = {
    name: 'video',
    multiple: false,
    beforeUpload: (file: UploadFile) => {
      // 阻止自动上传
      return false;
    },
    onChange: ({ fileList }) => {
      // 只保留最后选择的文件
      const currentFile = fileList[fileList.length - 1];
      if (currentFile && currentFile.originFileObj) {
        setSelectedFile(currentFile.originFileObj);
        message.success(`已选择文件：${currentFile.name}`);
      }
      // 清空文件列表，避免显示默认的上传列表
      return {
        fileList: [],
      };
    },
    onDrop: (e) => {
      console.log('Dropped files', e.dataTransfer.files);
    },
    showUploadList: false,
  };

  return (
    <div className="edit-video-container">
      <div className="each-func-title">
        <h2>
          <i className={`each-func-icons iconfont icon-wenjianshangchuan`}></i>
          视频管理
        </h2>
      </div>

      {/* 上传视频部分 */}
      <div className="post-video-container">
        <div className="upload-section">
          <div className="edit-video-post-box">
            <label htmlFor="categoryInput">指定视频类别：</label>
            <input
              type="text"
              id="categoryInput"
              placeholder="使用英文，例如: 实验室介绍视频-introduce；前端组-web"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              disabled={uploading}
              className="category-input"
            />
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                点击或者拖拽文件到该区域进行上传
              </p>
              <p className="ant-upload-hint">
                注意⚠️：上传视频文件时对文件进行重命名，文件名即为视频标题！！
              </p>
            </Dragger>
            <button
              onClick={handlerUpload}
              disabled={uploading}
              className={`edit-video-upload-button ${uploading ? 'uploading' : ''}`}
            >
              {uploading ? '上传中...' : '确认上传'}
            </button>
            <p className="upload-category-tips">
              注意：上传相同类别的视频会覆盖原视频
            </p>
          </div>
        </div>
        {/* 各方向视频展示 */}
        <div className="video-list-container">
          <h3>视频列表管理</h3>
          <div className="edit-video-item">
            {allVideos?.map((categoryItem, index) => (
              <div key={index} className="category-section">
                <h4 className="category-title">
                  类别：{categoryItem.category}
                </h4>
                <div className="category-videos">
                  {categoryItem.videos.map((videoItem, videoIndex) => (
                    <div key={videoIndex} className="video-card">
                      <div className="video-info">
                        <span className="video-name">
                          标题：{videoItem.name}
                        </span>
                      </div>
                      <div className="video-actions">
                        {/* <a
                          href={videoItem.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          查看视频
                        </a> */}
                        <video
                          src={videoItem.url}
                          controls
                          style={{ maxWidth: '100%' }}
                        ></video>
                        <button
                          className="delete-btn"
                          onClick={() =>
                            handleDeleteVideo(videoItem.url, videoItem.name)
                          }
                          disabled={uploading}
                        >
                          删除
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            {(!allVideos || allVideos.length === 0) && (
              <div className="no-videos">暂无视频数据</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editvideo;
