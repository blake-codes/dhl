// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TrackingResults = ({ data }: { data: any }) => {
  return (
    <div>
      <h2>Tracking Details</h2>
      <p>Status: {data.status}</p>
      <p>Current Location: {data.location}</p>
      <p>Estimated Delivery: {data.estimatedDelivery}</p>
    </div>
  );
};

export default TrackingResults;
