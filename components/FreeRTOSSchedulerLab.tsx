'use client';

import React, { useState } from 'react';
import { Cpu, Zap, Activity, Clock, ShieldCheck, Layers, Play, Pause } from 'lucide-react';

interface TaskSpec {
  id: string;
  name: string;
  core: string;
  priority: number;
  freq: string;
  periodMs: number;
  execMs: number;
  color: string;
  description: string;
}

export const FreeRTOSSchedulerLab: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [activeTask, setActiveTask] = useState<string>('vTaskMotorPID');

  const tasks: TaskSpec[] = [
    {
      id: 'vTaskMotorPID',
      name: 'vTaskMotorPID',
      core: 'STM32F4 Core (Hard Real-Time)',
      priority: 5,
      freq: '100 Hz',
      periodMs: 10.0,
      execMs: 0.8,
      color: 'bg-brand-cyan text-black border-brand-cyan',
      description: 'Baca encoder quadrature 4x, hitung 4 loop PID diskrit, output modulasi PWM driver.',
    },
    {
      id: 'vTaskSensorFusion',
      name: 'vTaskSensorFusion',
      core: 'STM32F4 Core',
      priority: 4,
      freq: '50 Hz',
      periodMs: 20.0,
      execMs: 1.2,
      color: 'bg-emerald-400 text-black border-emerald-400',
      description: 'Sampling SPI MPU6500 6-DOF IMU, fusi Extended Kalman Filter (EKF) dead-wheel odometry.',
    },
    {
      id: 'vTaskCVComm',
      name: 'vTaskCVComm',
      core: 'STM32 DMA / ESP32-S3',
      priority: 3,
      freq: '30 Hz',
      periodMs: 33.3,
      execMs: 1.5,
      color: 'bg-sky-400 text-black border-sky-400',
      description: 'Parsing frame paket UART Jetson / Mini-PC, kalkulasi waypoint kejaran kamera (Xr, Yr).',
    },
    {
      id: 'vTaskSafetyWatchdog',
      name: 'vTaskSafetyWatchdog',
      core: 'Supervisory Context',
      priority: 2,
      freq: '10 Hz',
      periodMs: 100.0,
      execMs: 0.3,
      color: 'bg-purple-400 text-black border-purple-400',
      description: 'Heartbeat ping keep-alive, monitoring batas voltase baterai LiPo, failsafe E-Stop lock.',
    },
  ];

  // Total CPU calculation: (0.8/10 + 1.2/20 + 1.5/33.3 + 0.3/100) * 100 = 8.0% + 6.0% + 4.5% + 0.3% = 18.8%
  const totalCpuLoad = (0.8 / 10 + 1.2 / 20 + 1.5 / 33.3 + 0.3 / 100) * 100;
  const idleHeadroom = 100 - totalCpuLoad;

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-[#090F1C] border-2 border-brand-border space-y-6 shadow-2xl hud-corner">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center border border-purple-500/40">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-white">
              Arsitektur Multitasking FreeRTOS (Dual ESP32-S3 + STM32F4)
            </h3>
            <p className="text-xs text-slate-400">
              Penjadwalan tugas deterministik pra-emptive real-time (Hard Real-Time Task Timing Budget).
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 font-mono text-xs">
          <span className="px-2.5 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
            CPU LOAD: {totalCpuLoad.toFixed(1)}% (NORMAL)
          </span>
          <span className="px-2.5 py-1 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 font-bold">
            IDLE HEADROOM: {idleHeadroom.toFixed(1)}%
          </span>
        </div>
      </div>

      {/* Task Gantt Chart Simulation */}
      <div className="p-5 rounded-2xl bg-[#060A12] border border-slate-800 space-y-4">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="font-bold text-brand-cyan uppercase tracking-wider">
            Timeline Siklus Eksekusi Task (0ms – 100ms Window):
          </span>
          <span className="text-slate-400">Timer Tick: 1.0 ms Tick Rate</span>
        </div>

        {/* Task Timeline Bars */}
        <div className="space-y-3 font-mono text-[11px]">
          {tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => setActiveTask(task.id)}
              className={`p-3 rounded-xl border transition cursor-pointer ${
                activeTask === task.id
                  ? 'bg-slate-900/90 border-brand-cyan shadow-[0_0_15px_rgba(0,245,212,0.15)]'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center space-x-2">
                  <span className="font-black text-white">{task.name}</span>
                  <span className="text-[10px] text-slate-400">({task.freq} / T={task.periodMs}ms)</span>
                </div>
                <div className="flex items-center space-x-2 text-[10px]">
                  <span className="text-slate-400">Exec: {task.execMs}ms</span>
                  <span className="px-1.5 py-0.2 rounded bg-slate-800 text-brand-cyan font-bold">
                    Prio {task.priority}
                  </span>
                </div>
              </div>

              {/* Graphical Timing Pulses */}
              <div className="w-full h-3.5 bg-slate-900 rounded-lg overflow-hidden flex items-center p-0.5 border border-slate-800">
                {Array.from({ length: Math.floor(100 / task.periodMs) }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      marginLeft: `${(task.periodMs - task.execMs) * 0.9}%`,
                      width: `${Math.max(2, task.execMs * 8)}%`,
                    }}
                    className={`h-full rounded ${task.color} animate-pulse`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DMA UART Packet Inspector & Task Detail */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Selected Task Details */}
        <div className="p-4 rounded-2xl bg-[#060A12] border border-slate-800 space-y-2 text-xs">
          <div className="text-xs font-mono font-bold text-brand-cyan uppercase tracking-wider">
            Spesifikasi Task Terpilih ({activeTask}):
          </div>
          {(() => {
            const current = tasks.find((t) => t.id === activeTask) || tasks[0];
            return (
              <div className="space-y-2 text-slate-300">
                <p>{current.description}</p>
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] space-y-1">
                  <div>Konteks Eksekusi: <span className="text-white">{current.core}</span></div>
                  <div>Tingkat Prioritas: <span className="text-brand-cyan">Prioritas {current.priority} (Pre-emptive)</span></div>
                  <div>Alokasi Waktu: <span className="text-emerald-300">{current.execMs} ms per siklus {current.periodMs} ms</span></div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* High-Speed DMA UART Frame Structure */}
        <div className="p-4 rounded-2xl bg-[#060A12] border border-slate-800 space-y-2 font-mono text-xs">
          <div className="text-xs font-bold text-sky-400 uppercase tracking-wider">
            DMA UART Bus Protocol (921,600 Baud):
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] space-y-1.5 text-slate-300">
            <div className="text-brand-cyan font-bold">
              [SYNC: 0xAA 0x55] [ID: 0x01] [LEN: 0x18] [PAYLOAD: 24B] [CRC16] [\r\n]
            </div>
            <div className="text-[10px] text-slate-400 space-y-0.5">
              <div>• Payload: 4x Wheel Speeds (rad/s) + IMU Yaw Pitch Roll + ToF Distance</div>
              <div>• Transmisi DMA Ring Buffer Zero-CPU Overhead</div>
              <div>• Latensi Bus: &lt; 0.28 ms per frame paket</div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
