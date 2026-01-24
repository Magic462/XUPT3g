import RichTextEditor from '@/components/RichTextEditor';
import './Editintroduction.scss';
import { useEffect, useState } from 'react';
import { getIntroduction, postIntroduction } from '@/services/introduction';
import { message } from '@/utils/message';

const Editintroduction = () => {
  const [articleHTML, setActiveHTML] = useState<string | null>(null);
  const [introducton, setIntroduction] = useState<string>();

  useEffect(() => {
    const fetchIntroduction = async () => {
      try {
        const response = await getIntroduction();
        console.log(response);

        setIntroduction(response.content);
      } catch (err) {
        message.error('获取简介失败');
        console.log('获取简介失败：', err);
      }
    };
    fetchIntroduction();
  }, []);

  const handleSubmit = async () => {
    setIntroduction(articleHTML);
    try {
      const response = await postIntroduction(articleHTML);
      console.log(response);
      message.success('发布成功');
      await getIntroduction();
    } catch (err) {
      message.error('发布失败');
      console.log('发布失败：', err);
    }
  };
  return (
    <div className="edit-direction-container">
      <div className="each-func-title">
        <h2>
          <i className={`each-func-icons iconfont icon-dongtai`}></i>
          修改简介
        </h2>
      </div>
      <div className="edit-direction-box">
        <button onClick={() => handleSubmit()}>发布</button>
      </div>
      {/* 引入富文本编辑 */}
      <RichTextEditor initHTML={introducton} onGetHTML={setActiveHTML} />
    </div>
  );
};

export default Editintroduction;