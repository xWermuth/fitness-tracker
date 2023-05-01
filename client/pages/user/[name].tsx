import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { UserRes } from '../../api/user';
import { getWorkout } from '../../api/workout';
import UserNav from '../../components/nav/UserNav';
import { Workout } from '../../interfaces/workout.interface';
import { getUserInfo } from '../../store/features/user/user.selectors';
import { SVG_TRIANGLE_PATH } from '../../utils';

interface Props {
  user: UserRes;
}

const user: React.FC<Props> = ({ user }) => {
  const [date, setDate] = useState('');
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const userInfo = useSelector(getUserInfo);

  useEffect(() => {
    setDate(new Date().toLocaleString());

    getWorkout().then(setWorkouts).catch(console.error);
  }, []);

  // TODO fix
  if (!userInfo) {
    return <h3>Loading....</h3>;
  }

  return (
    <div className="w-full h-full space-y-10">
      <UserNav />
      <div>
        <div className="flex items-center space-x-1 text-xl font-medium">
          <h1>Welcome back </h1>
          <h1 className="uppercase">{userInfo.email}!</h1>
        </div>

        <span className="text-sm font-normal">{date}</span>
      </div>

      {workouts.map((workout) => {
        return (
          <div key={workout.id} className="rounded-lg p-5 bg-main-light w-80 space-y-3">
            <div className="rounded w-full h-40 overflow-hidden">
              <img src={SVG_TRIANGLE_PATH} className="w-full" draggable={false} />
            </div>
            <div className="w-full flex flex-col space-y-0">
              <h3 className="font-medium">{workout.name}</h3>
              <span>
                <small className="text-gray-200 font-normal text-sm">Duration: </small>
                <small className="font-normal text-white text-sm">{workout.duration} min.</small>
              </span>
              <span>
                <small className="text-gray-200 font-normal text-sm">Intensity: </small>
                <small className="font-normal text-white text-sm">{workout.intensity}</small>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default user;
