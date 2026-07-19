import { useEffect, useState } from "react";
import api from "../api";
import Sidebar from "../components/Sidebar";

function CompanyProfile() {

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const [company, setCompany] = useState({

        userId: user.id,

        companyName: "",

        ownerName: "",

        gstNumber: "",

        panNumber: "",

        address: "",

        city: "",

        district: "",

        state: "",

        pincode: "",

        phone: "",

        email: "",

        website: "",

        bankName: "",

        accountNumber: "",

        ifsc: "",

        branch: "",

        upiId: "",

        logoPath: "",

        signaturePath: "",

        sealPath: ""

    });

    const fetchCompanyProfile = async () => {

        try {

            const response = api.get(

                `/company-profile/${user.id}`

            );

            setCompany(response.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        fetchCompanyProfile();

    }, []);

    const handleChange = (e) => {

        setCompany({

            ...company,

            [e.target.name]: e.target.value

        });

    };

    const saveCompanyProfile = async () => {

        try {

            if (company.id) {

                api.put(

                    `/company-profile/${user.id}`,

                    company

                );

            }

            else {

                api.post(

                    "/company-profile",

                    company

                );

            }

            alert("Company Profile Saved Successfully");

            fetchCompanyProfile();

        }

        catch (error) {

            console.log(error);

            alert("Unable to save company profile.");

        }

    };

    const uploadImage = async (file, field) => {

        if (!file) return;

        try {

            const formData = new FormData();

            formData.append(

                "file",

                file

            );

            const response = api.post(

                "/upload/company",

                formData,

                {

                    headers: {

                        "Content-Type":

                            "multipart/form-data"

                    }

                }

            );

            setCompany({

                ...company,

                [field]: response.data

            });

        }

        catch (error) {

            console.log(error);

            alert("Image Upload Failed");

        }

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
        "
    >

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
                🏢 Company Profile
            </h1>

            <p
                className="
                mt-3
                text-lg
                text-[#8C8179]
                "
            >
                Configure your business information for GST invoices,
                reports and company branding.
            </p>

        </div>

        {/* FIRST ROW */}

        <div
            className="
            grid
            grid-cols-1
            xl:grid-cols-[340px_1fr]
            gap-8
            mb-8
            "
        >

            {/* LOGO CARD */}

            <div
                className="
                bg-white
                border
                border-[#E8E2DC]
                rounded-[32px]
                shadow-sm
                p-8
                "
            >

                <h2
                    className="
                    text-2xl
                    font-bold
                    text-[#655C56]
                    mb-6
                    "
                >
                    Company Logo
                </h2>

                <div
                    className="
                    w-full
                    h-[240px]
                    rounded-3xl
                    border-2
                    border-dashed
                    border-[#D9D0C9]

                    flex
                    items-center
                    justify-center

                    overflow-hidden

                    bg-[#FAF8F6]
                    "
                >

                    {

                        company.logoPath ?

                            <img

                                src={`/${company.logoPath}`}

                                alt="Logo"

                                className="
                                w-full
                                h-full
                                object-contain
                                p-4
                                "
                            />

                            :

                            <div
                                className="
                                text-center
                                text-[#9A8E85]
                                "
                            >

                                <div className="text-6xl">
                                    🏢
                                </div>

                                <p className="mt-4">
                                    No Logo Uploaded
                                </p>

                            </div>

                    }

                </div>

                <label
                    className="
                    mt-6
                    w-full
                    flex
                    justify-center
                    items-center

                    bg-[#655C56]
                    hover:bg-[#534A45]

                    text-white

                    rounded-2xl

                    py-4

                    cursor-pointer

                    transition
                    "
                >

                    {company.logoPath ? "Change Logo" : "Upload Logo"}

                    <input

                        type="file"

                        hidden

                        accept="image/*"

                        onChange={(e)=>

                            uploadImage(

                                e.target.files[0],

                                "logoPath"

                            )

                        }

                    />

                </label>

            </div>

            {/* BUSINESS DETAILS */}

            <div
                className="
                bg-white
                border
                border-[#E8E2DC]
                rounded-[32px]
                shadow-sm
                p-8
                "
            >

                <h2
                    className="
                    text-2xl
                    font-bold
                    text-[#655C56]
                    mb-8
                    "
                >
                    Business Information
                </h2>

                <div
                    className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-6
                    "
                >

                    <InputField
                        label="Company Name"
                        name="companyName"
                        value={company.companyName}
                        onChange={handleChange}
                    />

                    <InputField
                        label="Owner Name"
                        name="ownerName"
                        value={company.ownerName}
                        onChange={handleChange}
                    />

                    <InputField
                        label="GST Number"
                        name="gstNumber"
                        value={company.gstNumber}
                        onChange={handleChange}
                    />

                    <InputField
                        label="PAN Number"
                        name="panNumber"
                        value={company.panNumber}
                        onChange={handleChange}
                    />

                </div>

            </div>

        </div>

                {/* ADDRESS */}

        <div
            className="
            bg-white
            border
            border-[#E8E2DC]
            rounded-[32px]
            shadow-sm
            p-8
            mb-8
            "
        >

            <h2
                className="
                text-2xl
                font-bold
                text-[#655C56]
                mb-8
                "
            >
                📍 Address Information
            </h2>

            <div
                className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-6
                "
            >

                <div className="md:col-span-2">

                    <InputField
                        label="Street Address"
                        name="address"
                        value={company.address}
                        onChange={handleChange}
                    />

                </div>

                <InputField
                    label="City"
                    name="city"
                    value={company.city}
                    onChange={handleChange}
                />

                <InputField
                    label="District"
                    name="district"
                    value={company.district}
                    onChange={handleChange}
                />

                <InputField
                    label="State"
                    name="state"
                    value={company.state}
                    onChange={handleChange}
                />

                <InputField
                    label="Pincode"
                    name="pincode"
                    value={company.pincode}
                    onChange={handleChange}
                />

            </div>

        </div>

        {/* CONTACT + BANK */}

        <div
            className="
            grid
            grid-cols-1
            xl:grid-cols-2
            gap-8
            "
        >

            {/* CONTACT */}

            <div
                className="
                bg-white
                border
                border-[#E8E2DC]
                rounded-[32px]
                shadow-sm
                p-8
                "
            >

                <h2
                    className="
                    text-2xl
                    font-bold
                    text-[#655C56]
                    mb-8
                    "
                >
                    📞 Contact Details
                </h2>

                <div className="space-y-6">

                    <InputField
                        label="Phone Number"
                        name="phone"
                        value={company.phone}
                        onChange={handleChange}
                    />

                    <InputField
                        label="Email Address"
                        name="email"
                        value={company.email}
                        onChange={handleChange}
                    />

                    <InputField
                        label="Website"
                        name="website"
                        value={company.website}
                        onChange={handleChange}
                    />

                </div>

            </div>

            {/* BANK */}

            <div
                className="
                bg-white
                border
                border-[#E8E2DC]
                rounded-[32px]
                shadow-sm
                p-8
                "
            >

                <h2
                    className="
                    text-2xl
                    font-bold
                    text-[#655C56]
                    mb-8
                    "
                >
                    🏦 Bank Details
                </h2>

                <div className="space-y-6">

                    <InputField
                        label="Bank Name"
                        name="bankName"
                        value={company.bankName}
                        onChange={handleChange}
                    />

                    <InputField
                        label="Account Number"
                        name="accountNumber"
                        value={company.accountNumber}
                        onChange={handleChange}
                    />

                    <InputField
                        label="IFSC Code"
                        name="ifsc"
                        value={company.ifsc}
                        onChange={handleChange}
                    />

                    <InputField
                        label="Branch"
                        name="branch"
                        value={company.branch}
                        onChange={handleChange}
                    />

                    <InputField
                        label="UPI ID"
                        name="upiId"
                        value={company.upiId}
                        onChange={handleChange}
                    />

                </div>

            </div>

        </div>

                {/* SIGNATURE & SEAL */}

        <div
            className="
            grid
            grid-cols-1
            xl:grid-cols-2
            gap-8
            mt-8
            mb-10
            "
        >

            {/* SIGNATURE */}

            <div
                className="
                bg-white
                border
                border-[#E8E2DC]
                rounded-[32px]
                shadow-sm
                p-8
                "
            >

                <h2
                    className="
                    text-2xl
                    font-bold
                    text-[#655C56]
                    mb-6
                    "
                >
                    ✍️ Authorized Signature
                </h2>

                <div
                    className="
                    h-44
                    rounded-3xl
                    border-2
                    border-dashed
                    border-[#D9D0C9]
                    bg-[#FAF8F6]
                    flex
                    items-center
                    justify-center
                    overflow-hidden
                    "
                >

                    {
                        company.signaturePath ?

                        <img
                            src={`/${company.signaturePath}`}
                            alt="Signature"
                            className="w-full h-full object-contain"
                        />

                        :

                        <div className="text-center text-[#9A8E85]">

                            <div className="text-5xl">
                                ✍️
                            </div>

                            <p className="mt-3">
                                No Signature Uploaded
                            </p>

                        </div>

                    }

                </div>

                <label
                    className="
                    mt-6
                    w-full
                    flex
                    justify-center
                    items-center
                    bg-[#655C56]
                    hover:bg-[#544A45]
                    text-white
                    rounded-2xl
                    py-4
                    cursor-pointer
                    transition
                    "
                >

                    Upload Signature

                    <input

                        type="file"

                        hidden

                        accept="image/*"

                        onChange={(e)=>

                            uploadImage(

                                e.target.files[0],

                                "signaturePath"

                            )

                        }

                    />

                </label>

            </div>

            {/* SEAL */}

            <div
                className="
                bg-white
                border
                border-[#E8E2DC]
                rounded-[32px]
                shadow-sm
                p-8
                "
            >

                <h2
                    className="
                    text-2xl
                    font-bold
                    text-[#655C56]
                    mb-6
                    "
                >
                    🏢 Company Seal
                </h2>

                <div
                    className="
                    h-44
                    rounded-3xl
                    border-2
                    border-dashed
                    border-[#D9D0C9]
                    bg-[#FAF8F6]
                    flex
                    items-center
                    justify-center
                    overflow-hidden
                    "
                >

                    {

                        company.sealPath ?

                        <img
                            src={`/${company.sealPath}`}
                            alt="Seal"
                            className="w-full h-full object-contain"
                        />

                        :

                        <div className="text-center text-[#9A8E85]">

                            <div className="text-5xl">
                                🏢
                            </div>

                            <p className="mt-3">
                                No Company Seal Uploaded
                            </p>

                        </div>

                    }

                </div>

                <label
                    className="
                    mt-6
                    w-full
                    flex
                    justify-center
                    items-center
                    bg-[#655C56]
                    hover:bg-[#544A45]
                    text-white
                    rounded-2xl
                    py-4
                    cursor-pointer
                    transition
                    "
                >

                    Upload Seal

                    <input

                        type="file"

                        hidden

                        accept="image/*"

                        onChange={(e)=>

                            uploadImage(

                                e.target.files[0],

                                "sealPath"

                            )

                        }

                    />

                </label>

            </div>

        </div>

        {/* SAVE */}

        <div className="flex justify-end mb-12">

            <button

                onClick={saveCompanyProfile}

                className="
                bg-[#655C56]
                hover:bg-[#544A45]
                text-white
                px-10
                py-4
                rounded-2xl
                text-lg
                font-semibold
                shadow-lg
                transition-all
                duration-300
                hover:scale-105
                "

            >

                💾 Save Company Profile

            </button>

        </div>

    </div>

</div>

);

}function InputField({

    label,

    name,

    value,

    onChange

}) {

    return (

        <div>

            <label
                className="
                block
                mb-2
                font-medium
                text-[#655C56]
                "
            >

                {label}

            </label>

            <input

                type="text"

                name={name}

                value={value || ""}

                onChange={onChange}

                className="
                w-full
                border
                border-[#E8E2DC]
                rounded-2xl
                px-5
                py-3
                bg-[#FAF8F6]
                focus:outline-none
                focus:ring-2
                focus:ring-[#D1BDB0]
                transition
                "

            />

        </div>

    );

}

export default CompanyProfile;