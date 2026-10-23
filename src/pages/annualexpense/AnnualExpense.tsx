import { useEffect, useRef, useState } from 'react';
import { Navigate, useBlocker } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import {
  deleteAnnualExpense,
  getAnnualExpense,
  saveAnnualExpense,
} from '@/services/annualExpense';
import type { AnnualExpenseReport } from '@/types/annualExpense';
import { message } from '@/utils/message';
import RichTextEditor from '@/components/RichTextEditor';
import DeleteConfirmModal from '@/components/DeleteConfirmModal';
import '@/assets/icons/font_rkifxavxcn/iconfont.css';
import './AnnualExpense.scss';

const currentYear = new Date().getFullYear();
const years = Array.from(
  { length: currentYear - 2015 + 1 },
  (_, index) => currentYear - index
);

export default function AnnualExpense({
  editable = false,
}: {
  editable?: boolean;
}) {
  const { initialized, token, status } = useAuth();
  const canEdit = editable && status === '0';
  const [year, setYear] = useState(currentYear);
  const [report, setReport] = useState<AnnualExpenseReport | null>(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editorReset, setEditorReset] = useState(0);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reload, setReload] = useState(0);
  const dirty = canEdit && report !== null && content !== report.content;
  const busy = saving || deleting;
  const discardApproved = useRef(false);
  const blocker = useBlocker(() => !discardApproved.current && (dirty || busy));

  useEffect(() => {
    const beforeLogout = (event: Event) => {
      if (discardApproved.current) return;
      if (
        busy ||
        (dirty && !window.confirm('支出信息尚未保存，确定退出并放弃修改吗？'))
      ) {
        event.preventDefault();
      } else {
        discardApproved.current = true;
      }
    };
    window.addEventListener('app:before-logout', beforeLogout);
    return () => window.removeEventListener('app:before-logout', beforeLogout);
  }, [dirty, busy]);

  useEffect(() => {
    if (blocker.state !== 'blocked') return;
    if (!busy && window.confirm('支出信息尚未保存，确定离开并放弃修改吗？')) {
      blocker.proceed();
    } else {
      blocker.reset();
    }
  }, [blocker, busy]);

  useEffect(() => {
    if (!dirty && !busy) return;
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty, busy]);

  useEffect(() => {
    if (!initialized || !token || (editable && status !== '0')) return;
    const controller = new AbortController();
    setLoading(true);
    setFailed(false);
    setReport(null);
    setContent('');
    setEditing(false);
    getAnnualExpense(year, controller.signal)
      .then((data) => {
        if (controller.signal.aborted) return;
        setReport(data);
        setContent(data.content);
      })
      .catch(() => {
        if (!controller.signal.aborted) setFailed(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [year, reload, initialized, token, status, editable]);

  const save = async () => {
    if (busy || !report || !canEdit || !editing) return;
    if (!content.replace(/<[^>]*>/g, '').trim()) {
      message.warning('请填写年度支出明细');
      return;
    }
    if (new TextEncoder().encode(content).length > 102400) {
      message.warning('支出信息不能超过 100 KB');
      return;
    }
    setSaving(true);
    try {
      const saved = await saveAnnualExpense(year, content);
      setReport(saved);
      setContent(saved.content);
      setEditing(false);
      message.success('年度支出已保存');
    } catch {
      // Keep edits available for retry; request errors are shown by the HTTP layer.
    } finally {
      setSaving(false);
    }
  };

  const cancelEdit = () => {
    if (busy) return;
    setContent(report?.content ?? '');
    setEditing(false);
    setEditorReset((value) => value + 1);
  };

  const remove = async () => {
    if (busy || !canEdit || !report?.exists) return;
    setDeleting(true);
    try {
      await deleteAnnualExpense(year);
      setReport({ year, content: '', exists: false, updatedAt: null });
      setContent('');
      setEditing(false);
      setShowDeleteModal(false);
      message.success('年度支出已删除');
    } catch {
      // Only clear the report after the server confirms deletion.
    } finally {
      setDeleting(false);
    }
  };

  if (!initialized) return <p role="status">正在加载…</p>;
  if (!token) return <Navigate to="/login" replace />;
  if (editable && status !== '0')
    return <Navigate to="/mine/user/annual-expense" replace />;

  return (
    <section className="annual-expense">
      <div className="each-func-title">
        <h2>
          <i className="each-func-icons iconfont icon-aixinjuankuan" />
          年度支出
        </h2>
      </div>
      <div className="expense-controls donation-controls-box">
        <select
          id="expense-year"
          aria-label="年份"
          value={year}
          disabled={busy || showDeleteModal}
          onChange={(event) => {
            const next = Number(event.target.value);
            if (
              next !== year &&
              (!dirty ||
                window.confirm('支出信息尚未保存，确定切换年份并放弃修改吗？'))
            )
              setYear(next);
          }}
        >
          {years.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
        {canEdit && !loading && !failed && report && (
          <div className="expense-actions">
            {!report.exists && !editing ? (
              <button
                className="edit-donation-post-box"
                type="button"
                aria-label="新增年度支出"
                disabled={busy}
                onClick={() => setEditing(true)}
              >
                +
              </button>
            ) : editing ? (
              <>
                <button
                  type="button"
                  disabled={busy || !dirty || !content.trim()}
                  onClick={save}
                >
                  {saving ? '正在保存…' : report.exists ? '保存修改' : '保存'}
                </button>
                <button
                  className="expense-secondary"
                  type="button"
                  disabled={busy}
                  onClick={cancelEdit}
                >
                  取消
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => setEditing(true)}
                >
                  修改
                </button>
                {report.exists && (
                  <button
                    className="expense-danger"
                    type="button"
                    disabled={busy}
                    onClick={() => setShowDeleteModal(true)}
                  >
                    {deleting ? '正在删除…' : '删除'}
                  </button>
                )}
              </>
            )}
          </div>
        )}
      </div>
      {loading ? (
        <p className="expense-notice" role="status">
          正在加载支出信息…
        </p>
      ) : failed ? (
        <div className="expense-notice" role="alert">
          加载失败，请重试。
          <button type="button" onClick={() => setReload((value) => value + 1)}>
            重新加载
          </button>
        </div>
      ) : (
        <>
          <div className="expense-meta" aria-live="polite">
            {dirty
              ? '有尚未保存的修改'
              : report?.updatedAt
                ? `更新时间：${new Date(report.updatedAt).toLocaleString('zh-CN')}`
                : report?.exists
                  ? '该年度支出信息已录入'
                  : '该年度尚未录入支出信息'}
          </div>
          <div className="expense-workspace">
            {report?.exists || (canEdit && editing) ? (
              <div className="expense-panel">
                <RichTextEditor
                  initHTML={report?.content}
                  resetVersion={editorReset}
                  readOnly={!canEdit || !editing || busy}
                  placeholder="在这里编辑年度支出"
                  onGetHTML={canEdit && editing ? setContent : undefined}
                />
              </div>
            ) : (
              <article className="expense-panel expense-preview">
                <p className="expense-empty">该年度尚未录入支出信息</p>
              </article>
            )}
          </div>
        </>
      )}
      {showDeleteModal && (
        <DeleteConfirmModal
          delId={year}
          remindMessage={`确定删除 ${year} 年度的全部支出信息吗？删除后无法恢复。`}
          onHandlerDelete={setShowDeleteModal}
          onDelete={remove}
          busy={deleting}
        />
      )}
    </section>
  );
}
