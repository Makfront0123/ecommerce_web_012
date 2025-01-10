import React from 'react';
const TimerRegression = () => {

  return (
    <div className="flex flex-row items-start sm:gap-x-3 gap-x-0 sm:mr-1 mr-5 gap-y-5 text-gray-600" >
      <TimerInfo num={'0-369'} time='Days' />
      <TimerInfo num={'1-120'} time='Hours' />
      <TimerInfo num={'1-60'} time='Minutes' />
      <TimerInfo num={'1-30'} time='Seconds' />

    </div>
  );
};
export const TimerInfo = ({ time, num }: { time: string, num: string }) => {
  return (
    <div className="flex flex-col items-center px-4 py-4 rounded-full bg-white">
      <span className="text-sm font-bold">{time}</span>
      <strong className="text-sm">{num}</strong>
    </div>
  )
}
export default TimerRegression;
