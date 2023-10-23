import { Modal, Rate, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";


interface IProps {
    info: Record<string, string | number>,
    callback: () => void,
    children: React.ReactNode
}

function RatingModal({ info, callback, children }: IProps) {
    const [modalOpen, setModalOpen] = useState(false);
    const [rate, setRate] = useState(0);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false)

    const handleOnOk = async () => {
        setLoading(true)
        setLoading(false)
        callback()
        setModalOpen(false)
    }

    console.log(info);

    return <>
        <div onClick={() => setModalOpen(true)}>{children}</div>
        <Modal
            title="Your Rating"
            centered
            open={modalOpen}
            onOk={handleOnOk}
            onCancel={() => setModalOpen(false)}
        >
            {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                    <Spin />
                </div>
            ) : (
                <>
                    <Rate onChange={(e) => setRate(e)}/> {rate}
                    <TextArea onChange={(e) => setContent(e.target.value)} rows={5} placeholder="Share what you like about this product">{content}</TextArea>
                </>
            )}
        </Modal>
    </>;
}

export default RatingModal;