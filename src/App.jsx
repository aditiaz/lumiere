import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [homes, setHome] = useState("Home");
  const [apex, setApex] = useState();

  const acc = {};
  for (let i = 0; i < apex?.length; i++) {
    const element = apex[i];
    const home = element.home;
    acc[home] = (acc[home] || 0) + 1;
  }

  const [search, setSearch] = useState();
  useEffect(() => {
    fetch("https://raddythebrand.github.io/apex-legends/data.json")
      .then((response) => response.json())
      .then((data) => {
        setApex(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  let finalFilter;
  if (search) {
    const searchResult = apex.filter((e) => {
      return e.name.toLowerCase().includes(search.toLowerCase());
    });
    finalFilter = searchResult;
  } else if (homes === 1 || homes === 2 || homes === 3 || homes === 4) {
    finalFilter = apex.filter((element) => acc[element.home] === +homes);
  } else if (homes !== "Home" && homes !== 0) {
    const filteredByCategory = apex.filter((element) => element.home === homes);
    finalFilter = filteredByCategory;
  } else if (homes == "Home" || homes == 0) {
    finalFilter = apex;
  }

  const handleSelectChange = (event) => {
    setHome(event.target.value);
    setSearch(null);
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleSelectChangeNum = (event) => {
    setHome(Number(event.target.value));
    setSearch(null);
  };
  const [selectedName, setSelectedName] = useState(null);
  const [modal, setModal] = useState(false);

  const clickModal = (name) => {
    setSelectedName(name);
    setModal(!modal);
  };

  console.log(finalFilter);
  const [filePath, setFilePath] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const path = URL.createObjectURL(file);
    setFilePath(path);
  };
  return (
    <>
      <input
        type="text"
        placeholder="Search by name ..."
        value={search}
        onChange={handleSearch}
        className="w-[25%]  shadow-black shadow-2xl mt-10  border rounded text-black"
      />
      <table className="border-collapse w-full my-5">
        <thead className="">
          <tr className="h-[100px] bg-gray-800 text-white">
            <th className="border">No</th>
            <th className="border">Name</th>
            <th className="border">Nick Name</th>
            <th className="border">Quote</th>
            <th className="border">Thumbnail</th>
            <th className="border">Type</th>
            <th className="border   w-[15%] p-4">
              Home
              <div>
                <select
                  value={homes}
                  onChange={handleSelectChange}
                  className="bg-gray-800 border-none"
                  name=""
                  id=""
                >
                  <option className="text-center" value="Home">
                    All Home
                  </option>
                  <option value="Unknown">Unknown</option>
                  <option value="Gridiron">Gridiron</option>
                  <option value="Talos">Talos</option>
                  <option value="Gaea">Gaea</option>
                  <option value="Salvo">Salvo</option>
                  <option value="Solace">Solace</option>
                  <option value="Psamathe">Psamathe</option>
                  <option value="None">None</option>
                  <option value="Boreas">Boreas</option>
                  <option value="Angelia">Angelia</option>
                  <option value="Págos">Págos</option>
                  <option value="Typhon">Typhon</option>
                  <option value="He’s trying to find out!">He's trying to find out!</option>
                </select>
              </div>
            </th>
            <th className="border px-6">
              Category Number
              <div>
                <select
                  value={homes}
                  onChange={handleSelectChangeNum}
                  className="bg-gray-800 border-none"
                >
                  <option value={0}>All</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                </select>
              </div>
            </th>
            <th>Action</th>
          </tr>
        </thead>
        {finalFilter?.length === 0 ? (
          <div className="bg-red-500 rounded-lg  font-semibold h-56 p-5 text-white absolute top-[50%] left-[50%] transform translate-x-[-50%] -translate-y-2/4 text-center">
            <p className="text-5xl mt-[5%]">The Character You're looking for is Not Found</p>
          </div>
        ) : (
          <tbody>
            {apex ? (
              finalFilter?.map((e, i) => {
                return (
                  <tr key={e.quote} className="bg-gray-100">
                    <td className=" border">{i + 1}</td>
                    <td className=" border">{e.name}</td>
                    <td className=" border">{e.nickname}</td>
                    <td className="px-3 border">{e.quote}</td>
                    <td className=" border">
                      <img src={e.thumbnail.small} alt="" />
                    </td>
                    <td className=" border">{e.type}</td>
                    <td className=" border">{e.home}</td>
                    <td className=" border">{acc[e.home]}</td>

                    <td className=" border">
                      <button onClick={() => clickModal(e)}>Edit</button>
                      {modal && (
                        <Modal
                          selectedName={selectedName}
                          filePath={filePath}
                          handleFileChange={handleFileChange}
                          setFilePath={setFilePath}
                          clickModal={clickModal}
                        />
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="bg-gray-100 ">
                <td className="border">Loading ... </td>
                <td className="border">Loading ... </td>
                <td className="border">Loading ... </td>
                <td className="border">Loading ... </td>
                <td className="border">Loading ... </td>
                <td className="border">Loading ... </td>
                <td className="border">Loading ... </td>
                <td className="border">Loading ... </td>
              </tr>
            )}
          </tbody>
        )}
      </table>
    </>
  );
}

export default App;

const Modal = ({ selectedName, filePath, handleFileChange, setFilePath, clickModal }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-5">
      <div className="bg-[#98caaf] inline-block w-[35rem] rounded-lg ">
        <form className="my-10 space-y-10  w-full  inline-block" action="">
          <div className="">
            <div className="w-full flex justify-around">
              <div className="text-lg font-semibold py-2">
                <label className="block text-left" htmlFor="name">
                  Name :
                </label>
                <input
                  type="text"
                  className="placeholder:text-black  placeholder:text-lg rounded-lg border-gray-400"
                  placeholder={selectedName.name}
                />
              </div>
              <div className="text-lg font-semibold py-2">
                <label className="block text-left" htmlFor="name">
                  Nick Name :
                </label>
                <input
                  type="text"
                  className="placeholder:text-black  placeholder:text-lg rounded-lg border-gray-400"
                  placeholder={selectedName.nickname}
                />
              </div>
            </div>
            <div className="w-full  flex justify-around">
              <div className="text-lg font-semibold py-2">
                <label className="block text-left" htmlFor="name">
                  Home :
                </label>
                <input
                  type="text"
                  className="placeholder:text-black  placeholder:text-lg rounded-lg border-gray-400"
                  placeholder={selectedName.home}
                />
              </div>
              <div className="text-lg font-semibold py-2">
                <label className="block text-left" htmlFor="name">
                  Type :
                </label>
                <input
                  type="text"
                  className="placeholder:text-black  placeholder:text-lg rounded-lg border-gray-400"
                  placeholder={selectedName.type}
                />
              </div>
            </div>
            <div className="text-lg font-semibold py-2 mx-7 ">
              <label className="block text-left" htmlFor="name">
                Quote :
              </label>
              <input
                type="text"
                className="placeholder:text-black w-full h-14  placeholder:text-lg rounded-lg border-gray-400"
                placeholder={selectedName.quote}
              />
            </div>
          </div>
          <div className="bg-white p-2 mx-6 rounded-lg">
            <div className="bg-slate-500 h-40 p-3 flex justify-center rounded-lg mb-3">
              <img
                className="w-[100px] "
                src={filePath ? filePath : selectedName.thumbnail.small}
                alt=""
              />
            </div>
            <input type="file" onChange={handleFileChange} />
          </div>
          <div className="flex text-white justify-between mx-7">
            <button
              onClick={() => {
                setFilePath("");
                clickModal();
              }}
              className="w-36 bg-red-600"
            >
              Close
            </button>
            <button
              onClick={() => {
                setFilePath("");
                clickModal();
              }}
              className="w-36 bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
