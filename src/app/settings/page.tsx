'use client';

import { useState } from 'react';
import { Settings, User, Key, Bell, Save, Check } from 'lucide-react';

export default function SettingsPage() {
  const [bilibiliUid, setBilibiliUid] = useState('');
  const [steamId, setSteamId] = useState('');
  const [itadKey, setItadKey] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // 保存到 localStorage（演示用途）
    localStorage.setItem('agfun_settings', JSON.stringify({
      bilibili_uid: bilibiliUid,
      steam_id: steamId,
      itad_key: itadKey,
    }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500/15">
          <Settings size={20} className="text-primary-400" />
        </div>
        <div>
          <h1 className="text-xl font-bold">设置</h1>
          <p className="text-sm text-[var(--text-muted)]">配置你的数据源和通知偏好</p>
        </div>
      </div>

      {/* Bilibili */}
      <SettingsCard title="Bilibili" icon={<User size={16} className="text-bilibili" />} color="bilibili">
        <p className="text-xs text-[var(--text-muted)] mb-3">
          输入你的 Bilibili UID 以获取追番更新。可在 Bilibili 个人主页查看。
        </p>
        <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Bilibili UID</label>
        <input
          type="text"
          placeholder="例如：546195"
          value={bilibiliUid}
          onChange={e => setBilibiliUid(e.target.value)}
          className="w-full rounded-lg border border-[var(--border)] bg-white/5 px-3 py-2 text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] outline-none transition-colors focus:border-bilibili/50"
        />
      </SettingsCard>

      {/* Steam */}
      <SettingsCard title="Steam" icon={<Key size={16} className="text-steam" />} color="steam">
        <p className="text-xs text-[var(--text-muted)] mb-3">
          输入你的 Steam ID 以获取个性化推荐和愿望单信息。
        </p>
        <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">Steam ID / 自定义 URL</label>
        <input
          type="text"
          placeholder="例如：76561198000000000"
          value={steamId}
          onChange={e => setSteamId(e.target.value)}
          className="w-full rounded-lg border border-[var(--border)] bg-white/5 px-3 py-2 text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] outline-none transition-colors focus:border-steam/50"
        />
      </SettingsCard>

      {/* ITAD */}
      <SettingsCard title="IsThereAnyDeal" icon={<Bell size={16} className="text-deal" />} color="deal">
        <p className="text-xs text-[var(--text-muted)] mb-3">
          提供 ITAD API Key 以获取精确的史低价格数据。
          <a href="https://isthereanydeal.com/dev/key" target="_blank" rel="noopener noreferrer"
             className="ml-1 text-deal hover:underline">
            获取 API Key
          </a>
        </p>
        <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">API Key</label>
        <input
          type="password"
          placeholder="你的 ITAD API Key"
          value={itadKey}
          onChange={e => setItadKey(e.target.value)}
          className="w-full rounded-lg border border-[var(--border)] bg-white/5 px-3 py-2 text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] outline-none transition-colors focus:border-deal/50"
        />
      </SettingsCard>

      {/* Save */}
      <button
        onClick={handleSave}
        className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold transition-all ${
          saved
            ? 'bg-deal/20 text-deal'
            : 'bg-primary-500 text-white hover:bg-primary-600 active:scale-[0.98]'
        }`}
      >
        {saved ? <><Check size={16} /> 已保存</> : <><Save size={16} /> 保存设置</>}
      </button>
    </div>
  );
}

function SettingsCard({ title, icon, color, children }: {
  title: string;
  icon: React.ReactNode;
  color: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5">
      <div className="mb-3 flex items-center gap-2">
        {icon}
        <h2 className="text-sm font-semibold">{title}</h2>
      </div>
      {children}
    </div>
  );
}
