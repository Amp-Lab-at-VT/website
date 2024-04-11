

export default function Modal({ showModal, setShowModal, title, children } : ModalProps) {

    if (!showModal) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white rounded-md w-3/4 p-4 max-h-72 overflow-y-auto text-left">
                <h2 className="text-xl font-semibold mb-2 text-black">{title}</h2>
                <div>{children}</div>
                <button
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md mr-2 mt-5"
                    onClick={() => setShowModal(false)} >
                    Exit
                </button>
            </div>
        </div>
    );
}

type ModalProps = {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    title: string;
    children: React.ReactNode;
}
