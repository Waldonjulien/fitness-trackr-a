import { useState, useEffect } from "react";
import { getActivities } from "../api/activities";

import ActivityList from "./ActivityList";
import ActivityForm from "./ActivityForm";

export default function ActivitiesPage() {
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const syncActivities = async () => {
    const data = await getActivities();
    setActivities(data);
    setIsLoading(false);
  };

  useEffect(() => {
    syncActivities();
  }, []);

  return (
    <>
      <h1>Activities</h1>
      {isLoading && <p>Loading activities...</p>}
      {!isLoading && activities.length === 0 && <p>No activities found.</p>}
      {!isLoading && activities.length > 0 && (
        <ActivityList activities={activities} syncActivities={syncActivities} />
      )}
      <ActivityForm syncActivities={syncActivities} />
    </>
  );
}
