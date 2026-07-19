import { useEffect, useState } from "react";
import api from "../api";
import Sidebar from "../components/Sidebar";

function SkuMaster() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const [skus, setSkus] = useState([]);

    const [skuName, setSkuName] = useState("");

    const [category, setCategory] = useState("Rice");

    const [unit, setUnit] = useState("Quintal");

    const [description, setDescription] = useState("");

    const [active, setActive] = useState(true);

    const [search, setSearch] = useState("");

    const [editing, setEditing] = useState(false);

    const [selectedSku, setSelectedSku] = useState(null);

        const fetchSkus = async () => {

        try {

            const response = api.get(
                `/sku/user/${user.id}`
            );

            setSkus(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchSkus();

    }, []);

    const saveSku = async () => {

    if (skuName.trim() === "") {

        alert("Please Enter SKU Name");

        return;

    }

    try {

        api.post(

            "/sku",

            {

                userId: user.id,

                skuName,

                category,

                unit,

                description,

                active

            }

        );

        alert("SKU Added Successfully");

        clearForm();

        fetchSkus();

    }

    catch (error) {

        console.log(error);

    }

};

const updateSku = async () => {

    try {

        api.put(

            `/sku/${selectedSku.id}`,

            {

                skuName,

                category,

                unit,

                description,

                active

            }

        );

        alert("SKU Updated Successfully");

        clearForm();

        fetchSkus();

    }

    catch(error){

        console.log(error);

    }

};

const deleteSku = async(id)=>{

    if(!window.confirm("Delete this SKU?"))
        return;

    try{

        api.delete(

            `/sku/${id}`

        );

        fetchSkus();

    }

    catch(error){

        console.log(error);

    }

};

const editSku=(sku)=>{

    setEditing(true);

    setSelectedSku(sku);

    setSkuName(sku.skuName);

    setCategory(sku.category);

    setUnit(sku.unit);

    setDescription(sku.description);

    setActive(sku.active);

};

const filteredSkus = skus.filter(

    sku=>

        sku.skuName
        .toLowerCase()
        .includes(search.toLowerCase())

        ||

        sku.category
        .toLowerCase()
        .includes(search.toLowerCase())

);

const clearForm = () => {

    setSkuName("");

    setCategory("Rice");

    setUnit("Quintal");

    setDescription("");

    setActive(true);

    setEditing(false);

    setSelectedSku(null);

};

return (

<div className="page">

<Sidebar />

<div
className="
ml-20
lg:ml-72
px-8
py-8
min-h-screen
w-full
">

{/* HERO */}

<div

className="
rounded-[36px]
p-10
mb-8
border
border-[#E8E2DC]
shadow-sm
"

style={{

background:

"linear-gradient(135deg,#F3F2F5,#E6D5CB,#D1BDB0)"

}}

>

<h1

className="
text-5xl
font-bold
text-[#655C56]
"

>

📦 SKU Master

</h1>

<p

className="
mt-3
text-[#8C8179]
text-lg
"

>

Manage all Rice Mill SKUs from one place

</p>

</div>

<div
className="
grid
grid-cols-1
md:grid-cols-3
gap-6
mb-8
">

<div

className="
bg-white
border
border-[#E8E2DC]
rounded-[28px]
p-6
shadow-sm
">

<p className="text-[#8C8179]">

Total SKUs

</p>

<h2

className="
text-3xl
font-bold
text-[#655C56]
mt-2
">

{skus.length}

</h2>

</div>

<div

className="
bg-white
border
border-[#E8E2DC]
rounded-[28px]
p-6
shadow-sm
">

<p className="text-[#8C8179]">

Rice SKUs

</p>

<h2

className="
text-3xl
font-bold
text-[#655C56]
mt-2
">

{

skus.filter(

sku => sku.category === "Rice"

).length

}

</h2>

</div>

<div

className="
bg-white
border
border-[#E8E2DC]
rounded-[28px]
p-6
shadow-sm
">

<p className="text-[#8C8179]">

Active SKUs

</p>

<h2

className="
text-3xl
font-bold
text-[#655C56]
mt-2
">

{

skus.filter(

sku => sku.active

).length

}

</h2>

</div>

</div>

<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <div className="lg:col-span-1">

    <div
className="
bg-white
rounded-[32px]
border
border-[#E8E2DC]
shadow-sm
p-8
">

<h2
className="
text-2xl
font-bold
text-[#655C56]
mb-6
">

{

editing ?

"Update SKU"

:

"Add New SKU"

}

</h2>

<label className="font-medium">

SKU Name

</label>

<input

type="text"

value={skuName}

onChange={(e)=>

setSkuName(e.target.value)

}

className="

w-full

border

rounded-xl

p-3

mt-2

mb-5

"

/>

<label className="font-medium">

Category

</label>

<select

value={category}

onChange={(e)=>

setCategory(e.target.value)

}

className="

w-full

border

rounded-xl

p-3

mt-2

mb-5

"

>

<option>Rice</option>

<option>Broken Rice</option>

<option>Bran</option>

<option>Husk</option>

<option>Paddy</option>

<option>Param</option>

</select>

<label className="font-medium">

Unit

</label>

<select

value={unit}

onChange={(e)=>

setUnit(e.target.value)

}

className="

w-full

border

rounded-xl

p-3

mt-2

mb-5

"

>

<option>Quintal</option>

<option>Kg</option>

<option>Ton</option>

<option>Bag</option>

</select>

<label className="font-medium">

Description

</label>

<textarea

rows={4}

value={description}

onChange={(e)=>

setDescription(e.target.value)

}

className="

w-full

border

rounded-xl

p-3

mt-2

mb-5

"

/>

<div className="flex items-center gap-3 mb-6">

<input

type="checkbox"

checked={active}

onChange={(e)=>

setActive(e.target.checked)

}

/>

Active

</div>

<div className="flex gap-3">

<button

onClick={

editing ?

updateSku

:

saveSku

}

className="

flex-1

bg-[#C86A4A]

hover:bg-[#B85A3A]

text-white

py-3

rounded-xl

font-semibold

"

>

{

editing ?

"Update SKU"

:

"Save SKU"

}

</button>

<button

onClick={clearForm}

className="

px-6

bg-gray-300

rounded-xl

"

>

Clear

</button>

</div>

</div>

</div>
<div className="lg:col-span-2">

<div

className="

bg-white

rounded-[32px]

border

border-[#E8E2DC]

shadow-sm

p-8

overflow-x-auto

"

>

<div className="flex justify-between mb-6">

<h2

className="

text-2xl

font-bold

text-[#655C56]

"

>

SKU Register

</h2>

<input

type="text"

placeholder="Search SKU..."

value={search}

onChange={(e)=>

setSearch(e.target.value)

}

className="

border

rounded-xl

px-4

py-2

w-72

"

/>

</div>

<table className="w-full">

<thead>

<tr className="bg-[#D1BDB0] text-white">

<th className="p-4">ID</th>

<th className="p-4">SKU</th>

<th className="p-4">Category</th>

<th className="p-4">Unit</th>

<th className="p-4">Status</th>

<th className="p-4">Action</th>

</tr>

</thead>

<tbody>

{

filteredSkus.length===0 ?

(

<tr>

<td

colSpan="6"

className="

text-center

p-8

text-gray-500

"

>

No SKU Found

</td>

</tr>

)

:

(

filteredSkus.map((sku)=>(

<tr

key={sku.id}

className="border-b"

>

<td className="p-4">

{sku.id}

</td>

<td className="p-4 font-medium">

{sku.skuName}

</td>

<td className="p-4">

{sku.category}

</td>

<td className="p-4">

{sku.unit}

</td>

<td className="p-4">

{

sku.active ?

(

<span className="text-green-600">

Active

</span>

)

:

(

<span className="text-red-600">

Inactive

</span>

)

}

</td>

<td className="p-4">

<div className="flex gap-2">

<button

onClick={()=>editSku(sku)}

className="

bg-blue-600

text-white

px-4

py-2

rounded-lg

"

>

Edit

</button>

<button

onClick={()=>deleteSku(sku.id)}

className="

bg-red-600

text-white

px-4

py-2

rounded-lg

"

>

Delete

</button>

</div>

</td>

</tr>

))

)

}

</tbody>

</table>

</div>

</div>
</div>

</div>

</div>

);

}

export default SkuMaster;