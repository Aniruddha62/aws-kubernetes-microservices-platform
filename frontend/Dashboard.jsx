import React from 'react';
const Dashboard = () => (
  <div style={{ background: '#0f3460', minHeight: '100vh', padding: '2rem', color: '#fff' }}>
    <h1>Infrastructure Dashboard</h1>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
      {[{title:'Services Running',value:'5/5',color:'#4ade80'},{title:'Active Pods',value:'15',color:'#60a5fa'},{title:'CPU Usage',value:'42%',color:'#f59e0b'},{title:'Memory Usage',value:'68%',color:'#a78bfa'}].map(s => (
        <div key={s.title} style={{ background: '#16213e', borderRadius: '12px', padding: '1.5rem', border: '2px solid ' + s.color }}>
          <div style={{ color: '#aaa' }}>{s.title}</div>
          <div style={{ color: s.color, fontSize: '2rem', fontWeight: 'bold' }}>{s.value}</div>
        </div>
      ))}
    </div>
    <div style={{ background: '#16213e', borderRadius: '12px', padding: '1.5rem' }}>
      <h2>Service Health</h2>
      {['api-gateway:8080','user-service:8081','product-service:8082','order-service:8083','notification-service:8084'].map(svc => (
        <div key={svc} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid #333' }}>
          <span>{svc}</span><span style={{ color: '#4ade80' }}>RUNNING</span>
        </div>
      ))}
    </div>
  </div>
);
export default Dashboard;
