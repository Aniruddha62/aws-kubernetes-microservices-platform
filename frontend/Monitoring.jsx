import React from 'react';
const metrics = [
  {label:'CPU Usage',value:'42%',color:'#60a5fa'},
  {label:'Memory',value:'68%',color:'#a78bfa'},
  {label:'Req/min',value:'1.2k',color:'#4ade80'},
  {label:'Error Rate',value:'0.2%',color:'#f59e0b'},
  {label:'Resp Time',value:'145ms',color:'#22d3ee'},
  {label:'Active Pods',value:'15',color:'#4ade80'},
  {label:'Disk Usage',value:'34%',color:'#f87171'},
  {label:'Network I/O',value:'2.4 MB/s',color:'#fbbf24'},
];
const Monitoring = () => (
  <div style={{ background: '#0f3460', minHeight: '100vh', padding: '2rem', color: '#fff' }}>
    <h1>Infrastructure Monitoring (Prometheus + Grafana)</h1>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem', marginBottom: '2rem' }}>
      {metrics.map(m => (
        <div key={m.label} style={{ background: '#16213e', borderRadius: '12px', padding: '1.5rem', border: '1px solid ' + m.color }}>
          <div style={{ color: '#aaa', fontSize: '0.9rem' }}>{m.label}</div>
          <div style={{ color: m.color, fontSize: '2rem', fontWeight: 'bold', marginTop: '0.5rem' }}>{m.value}</div>
        </div>
      ))}
    </div>
    <div style={{ background: '#16213e', borderRadius: '12px', padding: '1.5rem' }}>
      <h2>Grafana Dashboards</h2>
      {['Kubernetes Cluster Overview','JVM Metrics - Spring Boot','API Gateway Traffic','Database Performance','EC2 Node Exporter'].map(name => (
        <div key={name} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid #333' }}>
          <span>{name}</span><span style={{ color: '#60a5fa', cursor: 'pointer' }}>Open Dashboard</span>
        </div>
      ))}
    </div>
  </div>
);
export default Monitoring;
