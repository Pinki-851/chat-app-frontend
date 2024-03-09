export function Message({ data, id }: { data: any; id: string }) {
  // console.log("check", data, "id", id, data.id === id);
  return (
    <div
      // className={`h-[4rem]  p-[1rem] max-w-[20rem] text-[1.4rem] `}
      className={`${
        data.id === id ? "self-end bg-red-700" : "self-start bg-green-700"
      } w-[40%] p-[1rem] bg-gray-700 rounded-lg`}
    >
      <span>{data?.id === id ? "you" : data?.received_from.name}:</span>
      {data?.message}
    </div>
  );
}
