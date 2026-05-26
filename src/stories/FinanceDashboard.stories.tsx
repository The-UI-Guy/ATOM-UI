import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import * as RadixTabs from '@radix-ui/react-tabs';
import {
  ChartLine,
  Briefcase,
  ArrowsLeftRight,
  ChartBar,
  FileText,
  Gear,
  Bell,
  ArrowUpRight,
  ArrowDownRight,
  DotsThree,
  SignOut,
  Plus,
  Download,
  CaretUp,
  CaretDown,
  House,
  CurrencyDollar,
} from '@phosphor-icons/react';

import { Button } from '../components/Button';
import { Avatar } from '../components/Avatar';
import { Badge } from '../components/Badge';
import { Tag } from '../components/Tag';
import { Tabs } from '../components/Tabs';
import { Tooltip } from '../components/Tooltip';
import { ListItem } from '../components/ListItem';
import { Divider } from '../components/Divider';
import { SearchField } from '../components/Input';


// ─── Mock Data ──────────────────────────────────────────────────────────────

const holdings = [
  { symbol: 'AAPL', name: 'Apple Inc.', shares: 42, price: 189.84, value: 7973.28, dayChange: 1.24, dayChangePct: 0.66, totalReturn: 2140.50, totalReturnPct: 36.7 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', shares: 18, price: 421.57, value: 7588.26, dayChange: -2.34, dayChangePct: -0.55, totalReturn: 1920.18, totalReturnPct: 33.9 },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', shares: 12, price: 875.40, value: 10504.80, dayChange: 14.20, dayChangePct: 1.65, totalReturn: 7104.80, totalReturnPct: 209.0 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 30, price: 176.33, value: 5289.90, dayChange: -0.87, dayChangePct: -0.49, totalReturn: 789.90, totalReturnPct: 17.5 },
  { symbol: 'TSLA', name: 'Tesla Inc.', shares: 25, price: 172.54, value: 4313.50, dayChange: 3.11, dayChangePct: 1.83, totalReturn: -986.50, totalReturnPct: -18.6 },
  { symbol: 'BRK.B', name: 'Berkshire Hathaway', shares: 20, price: 418.22, value: 8364.40, dayChange: 0.98, dayChangePct: 0.23, totalReturn: 2164.40, totalReturnPct: 34.9 },
];

const transactions = [
  { id: 1, type: 'buy', symbol: 'NVDA', name: 'NVIDIA Corp.', shares: 5, price: 852.10, total: 4260.50, date: 'Apr 12, 2026', status: 'completed' },
  { id: 2, type: 'sell', symbol: 'TSLA', name: 'Tesla Inc.', shares: 10, price: 178.30, total: 1783.00, date: 'Apr 10, 2026', status: 'completed' },
  { id: 3, type: 'buy', symbol: 'AAPL', name: 'Apple Inc.', shares: 8, price: 186.20, total: 1489.60, date: 'Apr 8, 2026', status: 'completed' },
  { id: 4, type: 'dividend', symbol: 'MSFT', name: 'Microsoft Corp.', shares: 0, price: 0, total: 43.20, date: 'Apr 5, 2026', status: 'completed' },
  { id: 5, type: 'buy', symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 15, price: 172.80, total: 2592.00, date: 'Apr 1, 2026', status: 'completed' },
  { id: 6, type: 'sell', symbol: 'AAPL', name: 'Apple Inc.', shares: 5, price: 191.50, total: 957.50, date: 'Mar 28, 2026', status: 'completed' },
];

const navItems = [
  { id: 'overview', label: 'Overview', icon: <House size={16} /> },
  { id: 'portfolio', label: 'Portfolio', icon: <Briefcase size={16} /> },
  { id: 'transactions', label: 'Transactions', icon: <ArrowsLeftRight size={16} /> },
  { id: 'markets', label: 'Markets', icon: <ChartLine size={16} /> },
  { id: 'analytics', label: 'Analytics', icon: <ChartBar size={16} /> },
  { id: 'reports', label: 'Reports', icon: <FileText size={16} /> },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

const KpiCard = ({
  label,
  value,
  subValue,
  positive,
  tooltip,
}: {
  label: string;
  value: string;
  subValue?: string;
  positive?: boolean;
  tooltip?: string;
}) => (
  <div style={{
    background: 'var(--atom-surface-1)',
    border: '1px solid var(--atom-border-primary)',
    borderRadius: 12,
    padding: '20px 24px',
    flex: 1,
    minWidth: 0,
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
      <span style={{ fontSize: 13, color: 'var(--atom-text-tertiary)', fontWeight: 500 }}>{label}</span>
      {tooltip && (
        <Tooltip content={tooltip} placement="top">
          <span style={{ fontSize: 11, color: 'var(--atom-text-tertiary)', cursor: 'default', border: '1px solid var(--atom-border-primary)', borderRadius: '50%', width: 14, height: 14, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>?</span>
        </Tooltip>
      )}
    </div>
    <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--atom-text-primary)', letterSpacing: '-0.5px', marginBottom: 4 }}>
      {value}
    </div>
    {subValue && (
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {positive !== undefined && (
          positive
            ? <CaretUp size={12} weight="fill" color="var(--atom-success-main)" />
            : <CaretDown size={12} weight="fill" color="var(--atom-error-main)" />
        )}
        <span style={{
          fontSize: 13,
          fontWeight: 500,
          color: positive === undefined
            ? 'var(--atom-text-tertiary)'
            : positive ? 'var(--atom-success-main)' : 'var(--atom-error-main)',
        }}>
          {subValue}
        </span>
      </div>
    )}
  </div>
);

const HoldingsTable = () => (
  <div style={{ overflowX: 'auto' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
      <thead>
        <tr style={{ borderBottom: '1px solid var(--atom-border-primary)' }}>
          {['Symbol', 'Name', 'Shares', 'Price', 'Value', 'Day Change', 'Total Return', ''].map(col => (
            <th key={col} style={{ padding: '10px 16px', textAlign: col === '' ? 'right' : 'left', fontWeight: 500, color: 'var(--atom-text-tertiary)', whiteSpace: 'nowrap' }}>
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {holdings.map((h, i) => (
          <tr key={h.symbol} style={{ borderBottom: i < holdings.length - 1 ? '1px solid var(--atom-border-primary)' : 'none' }}>
            <td style={{ padding: '14px 16px' }}>
              <span style={{ fontWeight: 600, color: 'var(--atom-primary-main)' }}>{h.symbol}</span>
            </td>
            <td style={{ padding: '14px 16px', color: 'var(--atom-text-secondary)' }}>{h.name}</td>
            <td style={{ padding: '14px 16px' }}>{h.shares}</td>
            <td style={{ padding: '14px 16px' }}>${h.price.toFixed(2)}</td>
            <td style={{ padding: '14px 16px', fontWeight: 500 }}>${h.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
            <td style={{ padding: '14px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: h.dayChange >= 0 ? 'var(--atom-success-main)' : 'var(--atom-error-main)' }}>
                {h.dayChange >= 0 ? <ArrowUpRight size={14} weight="bold" /> : <ArrowDownRight size={14} weight="bold" />}
                <span>{h.dayChange >= 0 ? '+' : ''}{h.dayChange.toFixed(2)} ({h.dayChange >= 0 ? '+' : ''}{h.dayChangePct.toFixed(2)}%)</span>
              </div>
            </td>
            <td style={{ padding: '14px 16px' }}>
              <Tag
                size="sm"
                variant={h.totalReturn >= 0 ? 'primary' : 'outline'}
              >
                {h.totalReturn >= 0 ? '+' : ''}${Math.abs(h.totalReturn).toLocaleString('en-US', { minimumFractionDigits: 2 })} ({h.totalReturn >= 0 ? '+' : ''}{h.totalReturnPct.toFixed(1)}%)
              </Tag>
            </td>
            <td style={{ padding: '14px 16px', textAlign: 'right' }}>
              <Button variant="text" size="sm" iconOnly iconStart={<DotsThree size={16} weight="bold" />} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const TransactionRow = ({ tx }: { tx: typeof transactions[0] }) => {
  const isBuy = tx.type === 'buy';
  const isDividend = tx.type === 'dividend';

  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid var(--atom-border-primary)' }}>
      <div style={{
        width: 36, height: 36, borderRadius: '50%',
        background: isDividend ? 'var(--atom-halo-success)' : isBuy ? 'var(--atom-halo-primary)' : 'color-mix(in srgb, var(--atom-error-main) 10%, transparent)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, marginRight: 12,
      }}>
        {isDividend
          ? <CurrencyDollar size={16} color="var(--atom-success-main)" />
          : isBuy
            ? <ArrowDownRight size={16} color="var(--atom-primary-main)" />
            : <ArrowUpRight size={16} color="var(--atom-error-main)" />
        }
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontWeight: 600, fontSize: 13 }}>{tx.symbol}</span>
          <Tag size="sm" variant={isDividend ? 'neutral' : isBuy ? 'primary' : 'outline'}>
            {tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}
          </Tag>
        </div>
        <div style={{ fontSize: 12, color: 'var(--atom-text-tertiary)', marginTop: 2 }}>
          {isDividend ? 'Dividend payment' : `${tx.shares} shares @ $${tx.price.toFixed(2)}`} · {tx.date}
        </div>
      </div>
      <div style={{ textAlign: 'right', flexShrink: 0 }}>
        <div style={{ fontWeight: 600, fontSize: 13, color: isDividend || isBuy ? 'var(--atom-text-primary)' : 'var(--atom-error-main)' }}>
          {isBuy ? '-' : '+'}${tx.total.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </div>
        <div style={{ fontSize: 12, color: 'var(--atom-text-tertiary)', marginTop: 2 }}>Completed</div>
      </div>
    </div>
  );
};

// ─── Main Dashboard ───────────────────────────────────────────────────────────

const FinanceDashboardDemo = () => {
  const [activePage, setActivePage] = useState('overview');
  const [activeTab, setActiveTab] = useState('holdings');

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      background: 'var(--atom-surface-2)',
      fontFamily: 'Inter, sans-serif',
      color: 'var(--atom-text-primary)',
      overflow: 'hidden',
    }}>

      {/* ── Sidebar ── */}
      <div style={{
        width: 240,
        flexShrink: 0,
        background: 'var(--atom-surface-1)',
        borderRight: '1px solid var(--atom-border-primary)',
        display: 'flex',
        flexDirection: 'column',
        padding: '0',
        height: '100%',
      }}>
        {/* Brand */}
        <div style={{ padding: '20px 20px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: 'var(--atom-primary-main)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <ChartLine size={18} color="white" weight="bold" />
          </div>
          <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: '-0.3px' }}>Finvault</span>
        </div>

        <Divider />

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {navItems.map(item => (
            <ListItem
              key={item.id}
              icon={item.icon}
              active={activePage === item.id}
              onClick={() => setActivePage(item.id)}
            >
              {item.label}
            </ListItem>
          ))}
        </nav>

        <Divider />

        {/* Settings + User */}
        <div style={{ padding: '8px 8px 4px' }}>
          <ListItem icon={<Gear size={16} />} onClick={() => setActivePage('settings')}>Settings</ListItem>
          <ListItem icon={<SignOut size={16} />}>Sign out</ListItem>
        </div>

        {/* User profile */}
        <div style={{ padding: '12px 16px 20px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Avatar type="text" name="Alex Morgan" size="sm" shape="round" />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Alex Morgan</div>
            <div style={{ fontSize: 11, color: 'var(--atom-text-tertiary)' }}>Pro Plan</div>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

        {/* Header bar */}
        <div style={{
          background: 'var(--atom-surface-1)',
          borderBottom: '1px solid var(--atom-border-primary)',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          flexShrink: 0,
        }}>
          <div style={{ flex: 1 }}>
            <SearchField placeholder="Search stocks, transactions..." />
          </div>
          <Button variant="primary" size="sm" iconStart={<Plus size={14} weight="bold" />}>
            New Trade
          </Button>
          <Tooltip content="Download report" placement="bottom">
            <Button variant="outline" size="sm" iconOnly iconStart={<Download size={16} />} />
          </Tooltip>
          <div style={{ position: 'relative', display: 'inline-flex' }}>
            <Button variant="outline" size="sm" iconOnly iconStart={<Bell size={16} />} />
            <div style={{ position: 'absolute', top: -4, right: -4 }}>
              <Badge type="count" count={3} intent="error" />
            </div>
          </div>
          <Avatar type="text" name="Alex Morgan" size="sm" shape="round" />
        </div>

        {/* Scrollable content */}
        <div style={{ flex: 1, overflow: 'auto', padding: 24 }}>

          {/* Page title */}
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 4px', letterSpacing: '-0.4px' }}>
              Good morning, Alex
            </h1>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--atom-text-tertiary)' }}>
              April 15, 2026 · Markets open
            </p>
          </div>

          {/* KPI Cards */}
          <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
            <KpiCard
              label="Portfolio Value"
              value="$284,521.38"
              subValue="Updated just now"
              tooltip="Total market value of all your holdings plus cash"
            />
            <KpiCard
              label="Today's P&L"
              value="+$1,247.82"
              subValue="+0.44% today"
              positive={true}
              tooltip="Unrealized gain/loss for today's trading session"
            />
            <KpiCard
              label="Total Return"
              value="+$41,321.38"
              subValue="+17.0% all time"
              positive={true}
              tooltip="Total unrealized return since your first deposit"
            />
            <KpiCard
              label="Cash Balance"
              value="$12,450.00"
              subValue="Available to invest"
            />
          </div>

          {/* Main card with tabs */}
          <div style={{
            background: 'var(--atom-surface-1)',
            border: '1px solid var(--atom-border-primary)',
            borderRadius: 12,
            overflow: 'hidden',
          }}>
            {/* Card header */}
            <div style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--atom-border-primary)' }}>
              <RadixTabs.Root value={activeTab} onValueChange={setActiveTab}>
                <Tabs
                  variant="underline"
                  size="sm"
                  value={activeTab}
                  onValueChange={setActiveTab}
                  items={[
                    { value: 'holdings', label: 'Holdings', counter: holdings.length },
                    { value: 'transactions', label: 'Transactions', counter: transactions.length },
                    { value: 'allocation', label: 'Allocation' },
                  ]}
                />
              </RadixTabs.Root>
              <div style={{ display: 'flex', gap: 8 }}>
                <Button variant="outline" size="sm">Filter</Button>
                <Button variant="outline" size="sm" iconStart={<Download size={14} />}>Export</Button>
              </div>
            </div>

            {/* Tab panels */}
            {activeTab === 'holdings' && <HoldingsTable />}

            {activeTab === 'transactions' && (
              <div>
                {transactions.map(tx => (
                  <TransactionRow key={tx.id} tx={tx} />
                ))}
              </div>
            )}

            {activeTab === 'allocation' && (
              <div style={{ padding: 32 }}>
                <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                  {[
                    { label: 'Technology', pct: 41, color: 'var(--atom-primary-main)' },
                    { label: 'Consumer Disc.', pct: 15, color: '#10b981' },
                    { label: 'Financials', pct: 29, color: '#f59e0b' },
                    { label: 'Cash', pct: 15, color: 'var(--atom-text-tertiary)' },
                  ].map(seg => (
                    <div key={seg.label} style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 200 }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                          <span style={{ fontSize: 13, fontWeight: 500 }}>{seg.label}</span>
                          <span style={{ fontSize: 13, fontWeight: 600 }}>{seg.pct}%</span>
                        </div>
                        <div style={{ height: 6, borderRadius: 3, background: 'var(--atom-neutral-one)', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${seg.pct}%`, borderRadius: 3, background: seg.color }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bottom row: alerts + quick stats */}
          <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>

            {/* Price alerts */}
            <div style={{
              flex: 1,
              background: 'var(--atom-surface-1)',
              border: '1px solid var(--atom-border-primary)',
              borderRadius: 12,
              padding: 20,
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>Price Alerts</h3>
                <Button variant="text" size="sm" iconStart={<Plus size={14} />}>Add</Button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { symbol: 'AAPL', condition: 'above $200.00', active: true },
                  { symbol: 'NVDA', condition: 'below $800.00', active: false },
                  { symbol: 'TSLA', condition: 'above $190.00', active: true },
                ].map(alert => (
                  <div key={alert.symbol + alert.condition} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Tag size="sm" variant="neutral">{alert.symbol}</Tag>
                    <span style={{ fontSize: 13, color: 'var(--atom-text-secondary)', flex: 1 }}>{alert.condition}</span>
                    <Tag size="sm" variant={alert.active ? 'primary' : 'outline'}>{alert.active ? 'Active' : 'Paused'}</Tag>
                  </div>
                ))}
              </div>
            </div>

            {/* Market movers */}
            <div style={{
              flex: 1,
              background: 'var(--atom-surface-1)',
              border: '1px solid var(--atom-border-primary)',
              borderRadius: 12,
              padding: 20,
            }}>
              <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600 }}>Market Movers</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { symbol: 'META', change: +4.21, pct: +3.8 },
                  { symbol: 'AMD', change: +2.87, pct: +2.4 },
                  { symbol: 'AMZN', change: -3.14, pct: -1.9 },
                  { symbol: 'NFLX', change: -5.62, pct: -2.3 },
                ].map(mover => (
                  <div key={mover.symbol} style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontWeight: 600, fontSize: 13, width: 56 }}>{mover.symbol}</span>
                    <div style={{ flex: 1, height: 4, borderRadius: 2, background: 'var(--atom-neutral-one)', overflow: 'hidden', margin: '0 12px' }}>
                      <div style={{
                        height: '100%',
                        width: `${Math.abs(mover.pct) * 15}%`,
                        borderRadius: 2,
                        background: mover.change >= 0 ? 'var(--atom-success-main)' : 'var(--atom-error-main)',
                        marginLeft: mover.change >= 0 ? '50%' : `calc(50% - ${Math.abs(mover.pct) * 15}%)`,
                      }} />
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 500, color: mover.change >= 0 ? 'var(--atom-success-main)' : 'var(--atom-error-main)', textAlign: 'right', width: 70 }}>
                      {mover.change >= 0 ? '+' : ''}{mover.pct.toFixed(1)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming */}
            <div style={{
              flex: 1,
              background: 'var(--atom-surface-1)',
              border: '1px solid var(--atom-border-primary)',
              borderRadius: 12,
              padding: 20,
            }}>
              <h3 style={{ margin: '0 0 16px', fontSize: 14, fontWeight: 600 }}>Upcoming Events</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { date: 'Apr 16', event: 'NVDA Earnings Call', type: 'earnings' },
                  { date: 'Apr 18', event: 'AAPL Dividend Ex-Date', type: 'dividend' },
                  { date: 'Apr 22', event: 'MSFT Earnings Call', type: 'earnings' },
                  { date: 'Apr 29', event: 'TSLA Earnings Call', type: 'earnings' },
                ].map(ev => (
                  <div key={ev.event} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 11, color: 'var(--atom-text-tertiary)', width: 40, flexShrink: 0 }}>{ev.date}</span>
                    <span style={{ fontSize: 13, flex: 1 }}>{ev.event}</span>
                    <Tag size="sm" variant={ev.type === 'dividend' ? 'neutral' : 'primary'}>
                      {ev.type === 'dividend' ? 'Div' : 'Earn'}
                    </Tag>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Story ────────────────────────────────────────────────────────────────────

const meta: Meta = {
  title: 'Examples/Finance Dashboard',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Dashboard: Story = {
  render: () => <FinanceDashboardDemo />,
};
