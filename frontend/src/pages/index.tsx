import CheckBox from "@/components/Form/CheckBox";

export default function Home() {
  const opciones = ['Si', 'No'];
  
  return (
    <div className="">
      <h1 className="text-red-700">The Flash DM2V</h1>
      <CheckBox
        name="specialCapacity"
        options={['Si', 'No']}
        selectedOptions={opciones}
        allowMultiple={false}
        onChange={(updatedValue) => {}}
      />
    </div>
  );
}
