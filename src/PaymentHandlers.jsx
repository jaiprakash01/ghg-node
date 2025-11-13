import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Layout = ({ children }) => (
  <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
    <div className="max-w-2xl w-full space-y-8 bg-slate-900/60 backdrop-blur-lg border border-slate-700 rounded-3xl p-8 shadow-2xl">
      {children}
    </div>
  </div>
);

const StatusCard = ({ variant = 'success', title, message }) => {
  const variants = {
    success: {
      ring: 'ring-emerald-500/60',
      badge: 'bg-emerald-600/20 text-emerald-200 border border-emerald-400/40',
      icon: 'text-emerald-400',
    },
    failed: {
      ring: 'ring-red-500/60',
      badge: 'bg-red-600/20 text-red-200 border border-red-400/40',
      icon: 'text-red-400',
    },
    error: {
      ring: 'ring-amber-500/60',
      badge: 'bg-amber-600/20 text-amber-200 border border-amber-400/40',
      icon: 'text-amber-400',
    },
  };

  const styles = variants[variant] || variants.success;

  return (
    <div className={`rounded-2xl border border-slate-700/80 bg-slate-900/70 p-8 shadow-xl ring-1 ${styles.ring}`}>
      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${styles.badge}`}>
        <span className={`inline-flex h-2.5 w-2.5 rounded-full ${styles.icon}`}></span>
        Payment Status
      </div>
      <h1 className="mt-6 text-3xl md:text-4xl font-bold tracking-tight text-slate-50">{title}</h1>
      <p className="mt-4 text-lg text-slate-300 leading-relaxed">{message}</p>
    </div>
  );
};

const ActionButtons = ({ onDashboard }) => (
  <div className="grid sm:grid-cols-2 gap-4">
    <a
      href="/"
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-800/70 px-5 py-3 text-sm font-semibold text-slate-200 shadow-lg shadow-slate-900/40 ring-1 ring-slate-700/70 transition hover:bg-slate-800"
    >
      ← Back to Home
    </a>
    <button
      onClick={onDashboard}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/40 transition hover:bg-emerald-400"
    >
      Open Dashboard →
    </button>
  </div>
);

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const reference = params.get('reference');

  return (
    <Layout>
      <StatusCard
        variant="success"
        title="Payment Successful"
        message={reference ? `Thank you for your payment. Reference ID: ${reference}.` : 'Thank you for your payment. Your transaction is complete.'}
      />
      <ActionButtons onDashboard={() => navigate('/dashboard')} />
    </Layout>
  );
};

const PaymentFailed = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const reason = params.get('reason');

  return (
    <Layout>
      <StatusCard
        variant="failed"
        title="Payment Failed"
        message={reason ? `The payment could not be completed. Reason: ${reason}.` : 'The payment could not be completed. Please try again or contact support.'}
      />
      <ActionButtons onDashboard={() => navigate('/dashboard')} />
    </Layout>
  );
};

const PaymentError = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <StatusCard
        variant="error"
        title="Payment Error"
        message="Something went wrong while processing the payment. Please refresh or try again later."
      />
      <ActionButtons onDashboard={() => navigate('/dashboard')} />
    </Layout>
  );
};

export { PaymentSuccess, PaymentFailed, PaymentError };


