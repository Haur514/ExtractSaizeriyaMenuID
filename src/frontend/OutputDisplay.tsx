type Props = {
    menuIds: string[];
}

export default function OutputDisplay({menuIds}: Props) {
  return(
    <div className="w-full p-2">
        <div className="w-full min-h-2 max-h-44 overflow-scroll">
        {menuIds.map((e) => {
            return(
                <div key={e}>
                    {e}
                </div>
            );
        })}
        </div>
    </div>
  );
}
