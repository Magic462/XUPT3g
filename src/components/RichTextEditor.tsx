// 富文本组件
import '@wangeditor/editor/dist/css/style.css';
import React, { useState, useEffect } from 'react';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import {
  IDomEditor,
  IEditorConfig,
  IToolbarConfig,
  IButtonMenu,
  Boot,
} from '@wangeditor/editor';
import MediaLibraryModal from './MediaLibraryModal';

declare global {
  interface Window {
    __mediaMenuRegistered?: boolean;
  }
}

declare module '@wangeditor/editor' {
  interface IEditorConfig {
    uploadImgFromMedia?: () => void;
    XSSFilter: boolean;
    pasteFilterStyle: boolean;
    customParseHtml?: (html: string) => HTMLElement;

    // sanitize: boolean;
  }
}

// 注册菜单
// 内联定义 media 按钮
class MediaMenu implements IButtonMenu {
  hotkey?: string;
  alwaysEnable?: boolean;
  width?: number;
  title = '媒体库';
  iconSvg = `<svg t="1748228755323" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2369" width="200" height="200"><path d="M896 626.592a16 16 0 0 0-7.68-13.664l-172.448-105.088a16 16 0 0 0-20.704 3.52l-76 92.608-1.024 1.152a16 16 0 0 1-22.624 0.032l-252.832-252.064a16.032 16.032 0 0 0-22.08-0.512l-187.36 170.656a15.936 15.936 0 0 0-5.248 11.84V800h768v-173.408z" p-id="2370"></path><path d="M800 320m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z" p-id="2371"></path><path d="M32 128v768h960V128H32z m896 704H96V192h832v640z" p-id="2372"></path></svg>`;
  tag = 'button';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getValue(editor: IDomEditor): string | boolean {
    return false;
  }

  isActive(): boolean {
    return false;
  }

  isDisabled(): boolean {
    return false;
  }

  exec(editor: IDomEditor) {
    const fn = editor.getConfig().uploadImgFromMedia;
    if (fn) fn(); // 触发媒体库弹窗
  }
}

// 只注册一次菜单
if (!window.__mediaMenuRegistered) {
  Boot.registerMenu({
    key: 'media',
    factory() {
      return new MediaMenu();
    },
  });
  window.__mediaMenuRegistered = true;
}

interface RichTextEditorProps {
  initHTML?: string;
  onGetHTML?: (html: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  initHTML,
  onGetHTML,
}) => {
  const [editor, setEditor] = useState<IDomEditor | null>(null);
  const [html, setHtml] = useState('');
  const [mediaVisible, setMediaVisible] = useState(false);

  const toolbarConfig: Partial<IToolbarConfig> = {
    insertKeys: {
      index: 22,
      keys: ['media'],
    },
  };

  // function preprocessHTML(html: string): string {
  //   // 替换 <div class="media-wrap image-wrap"> 包裹的 img 为直接 img
  //   return html.replace(
  //     /<div class="media-wrap image-wrap">\s*(<img[^>]*>)\s*<\/div>/g,
  //     '$1'
  //   );
  // }

  // useEffect(() => {
  //   if (initHTML) {
  //     console.log(initHTML);
  //     const cleanHTML = preprocessHTML(initHTML);
  //     setHtml(cleanHTML);
  //   }

  // }, [initHTML]);
  // editor.dangerouslyInsertHtml(
  //   '<div class="media-wrap image-wrap"><img src="xxx.jpg" /></div>'
  // );

  useEffect(() => {
    if (initHTML) {
      console.log(initHTML);
      setHtml(initHTML);
      if (editor) {
        editor.setHtml(initHTML);
      }
    } else {
      setHtml('<p><br></p>');
      if (editor) {
        editor.setHtml('<p><br></p>');
      }
    }
  }, [initHTML, editor]);

  const editorConfig: Partial<IEditorConfig> = {
    placeholder: '在这里编辑新闻动态吧...',
    XSSFilter: false,
    pasteFilterStyle: false,
    customParseHtml: (html: string) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      return doc.body;
    },
    MENU_CONF: {
      uploadImage: {
        server: '', // 禁用默认上传
        customUpload: () => {}, // 留空即可
      },
    },
  };

  useEffect(() => {
    if (editor) {
      editor.getConfig().uploadImgFromMedia = () => {
        setMediaVisible(true);
      };
    }
  }, [editor]);

  const handleInsertImage = (urls: string[] | Set<string>) => {
    if (!editor) {
      console.warn('编辑器未初始化');
      return;
    }

    const urlList = Array.isArray(urls) ? urls : Array.from(urls);

    urlList.forEach((url) => {
      const imageNode = {
        type: 'image',
        src: url,
        alt: '',
        href: '',
        children: [{ text: '' }],
      };

      editor.insertNode(imageNode);
    });

    setMediaVisible(false);
  };

  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  return (
    <>
      <div style={{ minHeight: '400px', border: '1px solid #ccc' }}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: '1px solid #ccc' }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={(editor) => {
            const currentHtml = editor.getHtml();
            setHtml(currentHtml);
            onGetHTML?.(currentHtml);
          }}
          mode="default"
          style={{ height: '25rem', backgroundColor: '#fff' }}
        />
      </div>

      <MediaLibraryModal
        visible={mediaVisible}
        onClose={() => setMediaVisible(false)}
        onInsert={handleInsertImage}
      />

      <div style={{ marginTop: 20 }}>{html}</div>
    </>
  );
};

export default RichTextEditor;
