import React, { useState } from 'react';
import './MediaLibraryModal.scss';
import { getPictureUrl } from '@/services/picture';

interface Props {
  visible: boolean;
  onClose: () => void;
  onInsert: (urls: string[]) => void; // 支持批量插入
}

const MediaLibraryModal: React.FC<Props> = ({ visible, onClose, onInsert }) => {
  const [images, setImages] = useState<string[]>([]); // 已上传的图片列表（url）
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);

  // 伪造上传接口，替换为你的真实上传接口
  const fetchPictureUrl = async (picture) => {
    try {
      const response = await getPictureUrl(picture);
      return response;
    } catch (err) {
      console.log('上传图片失败', err);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);

    try {
      const res = await fetchPictureUrl(file);

      if (res?.success && res.url) {
        // 加入到图片列表中
        setImages((prev) => [...prev, res.url]);
      } else {
        console.error('上传失败或响应无效', res);
      }
    } catch (err) {
      console.error('上传异常', err);
    } finally {
      setLoading(false);
    }

    // 清空 input 防止连续上传同一张图无效
    e.target.value = '';
  };

  const toggleSelect = (url: string) => {
    const newSelected = new Set(selected);
    if (newSelected.has(url)) {
      newSelected.delete(url);
    } else {
      newSelected.add(url);
    }
    setSelected(newSelected);
  };

  const selectAll = () => {
    setSelected(new Set(images));
  };

  const deselectAll = () => {
    setSelected(new Set());
  };

  const deleteSelected = () => {
    setImages(images.filter((url) => !selected.has(url)));
    setSelected(new Set());
  };

  if (!visible) return null;

  return (
    <div className="media-library-overlay">
      <div className="media-library-modal">
        <h3>媒体库</h3>

        <div className="media-library-toolbar">
          <button onClick={selectAll}>选择全部</button>
          <button onClick={deselectAll}>取消选择</button>
          <button
            onClick={deleteSelected}
            disabled={selected.size === 0}
            className="delete-btn"
          >
            删除选中项目
          </button>
        </div>

        <div className="media-library-content">
          {/* 新增图片 */}
          <div className="media-library-item upload-item">
            <label htmlFor="upload-input" className="upload-label">
              +
            </label>
            <input
              id="upload-input"
              type="file"
              accept=".jpg"
              // onChange={handleUpload}
              onChange={handleUpload}
              style={{ display: 'none' }}
              disabled={loading}
            />
          </div>

          {/* 已上传图片列表 */}
          {images.map((url) => (
            <div
              key={url}
              className={`media-library-item ${selected.has(url) ? 'selected' : ''}`}
              onClick={() => toggleSelect(url)}
            >
              <img src={url} alt="media" />
              {selected.has(url) && <span className="checkmark">✔</span>}
            </div>
          ))}
        </div>

        {loading && <p>上传中...</p>}

        <div className="media-library-footer">
          <button onClick={onClose}>取消</button>
          <button
            onClick={() => {
              onInsert(Array.from(selected));
              onClose();
              setSelected(new Set());
            }}
            disabled={selected.size === 0}
          >
            插入所选项目
          </button>
        </div>
      </div>
    </div>
  );
};

export default MediaLibraryModal;
