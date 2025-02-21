import Navbar from "./components/Navbar"
import{ FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { collection, getDocs, onSnapshot, snapshotEqual } from "firebase/firestore"
import { useEffect, useState } from "react";
import { db } from "./config/firebase";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ContactCard from "./components/ContactCard";
import Model from "./components/Model";
import AddAndUpdateContact from "./components/AddAndUpdateContact";
import useDisclouse from "./hooks/useDisclouse";
import NotFoundContact from "./components/NotFoundContact";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const { isOpen, onClose, onOpen } = useDisclouse();

  // here we are going to perform network call
  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        onSnapshot(contactsRef, (snapshot) => {
          const contactLists = snapshot.docs.map((doc) => {
            return {
              //returning an object
              id: doc.id,
              ...doc.data(),
            }
          });
          setContacts(contactLists);
          return contactLists
        });

      } catch (error) {
        console.log(error);
      }
    }
    getContacts();
  }, [])

  const filterContacts = (e) => {
    const value = e.target.value;
    // useEffect wala code yaha copy karege kyuki sari cheeze update hona imp h
    const contactsRef = collection(db, "contacts");
        onSnapshot(contactsRef, (snapshot) => {
          const contactLists = snapshot.docs.map((doc) => {
            return {
              //returning an object
              id: doc.id,
              ...doc.data(),
            }
          });
          const filteredContacts = contactLists.filter((contact) => contact.name.toLowerCase().includes(value.toLowerCase()))
          setContacts(filteredContacts);
          return filteredContacts;
        });
  }


  return (
    <>
    <div className="mx-auto max-w-[370px] px-4">
      <Navbar />
      <div className="flex gap-2">
        <div className="relative flex flex-grow items-center">
          <FiSearch className="absolute ml-1 text-white text-3xl"/>
          <input onChange={filterContacts} type="text" className=" h-10 flex-grow rounded-md border border-white bg-transparent pl-9 text-white" />
        </div>
        <AiFillPlusCircle onClick={onOpen} className="cursor-pointer text-5xl text-white" />
      </div>
      <div className="mt-4 flex flex-col gap-4">
        {contacts.length <=0 ? (<NotFoundContact />) :contacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))
      }</div>
    </div>
    <ToastContainer position="bottom-center" />
    <AddAndUpdateContact onClose={onClose} isOpen={isOpen} />
    
    </>
  )
}

export default App
