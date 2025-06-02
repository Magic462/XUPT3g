import './Postactivity.scss';
import { useEffect, useState } from 'react';
import Upload from 'antd/es/upload';
import ImgCrop from 'antd-img-crop';
import RichTextEditor from '@/components/RichTextEditor';
import { getActivityContent, postArticle } from '@/services/activities';
// import { getPictureUrl } from '@/services/uploadImg';
import { getPictureUrl } from '@/services/picture';
import { message } from '@/utils/message';
import { AriticleRequast } from '@/types/article';
import { useSearchParams } from 'react-router-dom';

const Postactivity = () => {
  const [searchParams] = useSearchParams();
  const aid = searchParams.get('aid');

  const [postCover, setPostCover] = useState(false);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [articleHTML, setActiveHTML] = useState<string | null>(null);
  const [postArticleInfo, setPostActiveInfo] = useState<AriticleRequast>({
    title: '',
    content: '',
    img: '',
  });

  useEffect(() => {
    if (aid) {
      const fetchActivity = async () => {
        try {
          const response = await getActivityContent(Number(aid));
          console.log(response);
          setPostActiveInfo(response);
          // setActiveHTML(response.content);
        } catch (err) {
          message.error('获取文章信息', err);
        }
      };

      fetchActivity();
    }
  }, [aid]);

  const handleSubmit = async () => {
    if (!coverFile && !postArticleInfo.img) {
      return message.warning('请先选择封面图');
    }
    if (!postArticleInfo.title.trim()) return message.warning('请输入标题');
    if (!articleHTML || articleHTML.trim() === '<p><br></p>')
      return message.warning('请输入文章内容');

    try {
      const res = await getPictureUrl(coverFile);
      const imageUrl = res.url;

      // 提交文章信息
      const result = await postArticle(
        postArticleInfo.title,
        articleHTML,
        imageUrl
      );

      console.log('文章发布成功:', result);
      // alert('文章发布成功');
      message.success('文章发布成功');

      // 重置状态
      setPostCover(false);
      setPostActiveInfo({ title: '', content: '', img: '' });
      setCoverFile(null);
      setActiveHTML(null);
    } catch (err) {
      console.error('发布文章失败', err);
      alert('发布文章失败，请稍后重试');
    }
  };

  return (
    <div className="post-activity-container">
      <div className="each-func-title">
        <h2>
          <i className="each-func-icons iconfont icon-dongtai"></i>
          新建活动
        </h2>
      </div>

      <div className="post-activity-box">
        <div className="poat-activity-baseinfo-box">
          <div className="post-activity-title-box">
            <input
              type="text"
              placeholder="请输入标题..."
              value={postArticleInfo.title}
              onChange={(e) =>
                setPostActiveInfo({ ...postArticleInfo, title: e.target.value })
              }
            />
          </div>
          <div className="post-activity-btn-box">
            <div
              className="post-activity-btn"
              onClick={() => setPostCover(true)}
            >
              发布
            </div>
          </div>
        </div>

        <RichTextEditor
          initHTML={postArticleInfo.content}
          onGetHTML={setActiveHTML}
        />

        {postCover && (
          <>
            <div
              className="modal-mask"
              onClick={() => setPostCover(false)}
            ></div>
            <div className="post-activity-cover-box">
              <div className="close-btn" onClick={() => setPostCover(false)}>
                ×
              </div>
              <div className="post-activity-cover-title">选择封面图片</div>

              <ImgCrop rotationSlider aspect={47 / 35}>
                <Upload
                  showUploadList={false}
                  beforeUpload={(file) => {
                    const isImage = file.type.startsWith('image/');
                    if (!isImage) alert('只能上传图片');
                    return isImage || Upload.LIST_IGNORE;
                  }}
                  customRequest={({ file, onSuccess }) => {
                    setCoverFile(file as File);
                    onSuccess?.('ok');
                  }}
                >
                  <div className="cover-upload-wrapper">
                    {coverFile ? (
                      <div className="cover-preview-container">
                        <img
                          src={
                            postArticleInfo
                              ? postArticleInfo.img
                              : URL.createObjectURL(coverFile)
                          }
                          alt="封面预览"
                          className="cover-preview-img"
                        />
                        <div
                          className="remove-preview-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            setCoverFile(null);
                          }}
                        >
                          ×
                        </div>
                      </div>
                    ) : (
                      <div className="upload-placeholder">点击上传封面图</div>
                    )}
                  </div>
                </Upload>
              </ImgCrop>

              <div className="post-activity-cover-btn" onClick={handleSubmit}>
                确认发布
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Postactivity;
