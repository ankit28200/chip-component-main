import Image from 'next/image';
import React, { useEffect, useState } from 'react';

interface MultiSelectChipComponentProps {
    data: any
}

interface UserType {
    name: string,
    email: string,
    picUrl: string
}

function MultiSelectChipComponent({
    data
}: MultiSelectChipComponentProps) {
    const [showUsers, setShowUsers] = useState<boolean>(false);
    const [highlightLastUser, setHighlightLastUser] = useState<boolean>(false);
    const [inputText, setInputText] = useState<string>('');
    const [selectedUsers, setSelectedUsers] = useState<UserType[]>([]);
    const [allUsers, setAllUsers] = useState<UserType[]>(data);
    const [userList, setUserList] = useState<UserType[]>(data);

    const handleInputText = (e: React.FormEvent<HTMLInputElement>) => {
        const query = e.currentTarget.value;
        let searchUsers = allUsers.filter((user) => {
            return user.name.startsWith(query);
        });
        setInputText(e.currentTarget.value);
        setUserList(searchUsers);
    }

    const handleSelectUser = (newUser: UserType) => {
        let newUsers = allUsers.filter((user) => {
            return user.email != newUser.email
        });
        let filteredUsers: UserType[] = [...selectedUsers, newUser];
        setSelectedUsers(filteredUsers);
        setAllUsers(newUsers);
        setInputText('');
    }

    const handleRemoveSelectedUser = (existingUser: UserType) => {
        let filteredUsers = selectedUsers.filter((user) => {
            return user.email != existingUser.email
        });
        let newUsers = [...allUsers, existingUser];
        setAllUsers(newUsers);
        setSelectedUsers(filteredUsers);
    }

    const handleShowUsers = (e: any) => {
        if (e.keyCode === 8 && inputText.length === 0 && selectedUsers.length > 0) {
            setShowUsers(false);
            if (highlightLastUser) {
                let filteredUsers = [...selectedUsers];
                let removedUser = filteredUsers.pop();
                if (removedUser) {
                    let newUsers = [...allUsers, removedUser];
                    setAllUsers(newUsers);
                }
                setSelectedUsers(filteredUsers);
                setHighlightLastUser(false);
                setShowUsers(true);
            } else {
                setHighlightLastUser(true);
            }
        } else {
            setShowUsers(true);
        }
    }

    useEffect(() => {
        if (inputText === '') {
            setUserList(allUsers);
        }
    }, [allUsers, inputText]);

    return (
        <div>
            <div className="flex flex-wrap border-b-2 border-[#4e79ef] gap-2 py-1">
                {
                    selectedUsers?.map((user: UserType, index: any) => {
                        return (
                            <div
                                key={index}
                                className={`flex items-center gap-2 rounded-full bg-[#cbcdd4] 
                            ${(highlightLastUser && index === selectedUsers.length-1) && 'border-2 border-[#4e79ef]'}`} >
                                <Image
                                    width={38}
                                    height={38}
                                    className="flex-shrink-0 rounded-full"
                                    src={user.picUrl}
                                    alt="user photo" />
                                <p>{user.name}</p>
                                <svg
                                    onClick={() => handleRemoveSelectedUser(user)}
                                    className='mr-2  cursor-pointer'
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </div>
                        )
                    })
                }
                <div className="relative w-auto" onKeyDown={handleShowUsers}>
                    <input
                        value={inputText}
                        onClick={handleShowUsers}
                        onChange={handleInputText}
                        autoFocus={true}
                        type="text"
                        name="inputText"
                        id="inputTextId"
                        className="w-auto block px-1 py-2 text-gray-900 placeholder:text-gray-400 focus:outline-none"
                        placeholder="Add new user..." />
                    {
                        showUsers &&
                        <div className="absolute w-[500px] z-10 bg-white max-h-80 shadow-2xl scroll-auto overflow-y-auto" >
                            {
                                userList.length > 0 ?
                                    userList.map((user: UserType, index: any) => {
                                        return (
                                            <div
                                                onClick={() => handleSelectUser(user)}
                                                key={user.email + index}
                                                className="flex items-center gap-2 px-4 py-2 hover:bg-[#eae9ea] cursor-pointer"
                                            >
                                                <div className="w-[200px] flex items-center gap-4" >
                                                    <Image
                                                        width={38}
                                                        height={38}
                                                        className="flex-shrink-0 rounded-full"
                                                        src={user.picUrl}
                                                        alt="user photo" />
                                                    <p className="font-semibold" >
                                                        <span className="text-[#717071]" >
                                                            {user.name.slice(0, inputText.length)}
                                                        </span>
                                                        {user.name.slice(inputText.length)}
                                                    </p>
                                                </div>
                                                <div className="w-50 flex justify-end" >
                                                    <p className="w-full text-left text-[#a6a5a6]" >{user.email}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                    :
                                    <p className="p-2" >No user found.</p>
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default MultiSelectChipComponent;