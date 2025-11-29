import { Modal } from 'react-bootstrap'
import styled from 'styled-components';
const VimeoModal = (props) => {
    return (
                <CustomModal
                    {...props}
                    dialogClassName="auth-verification-modal"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={props?.show}
                    onHide={() =>props?.VimeoPopup(false)}
                >
                    <Modal.Body>
                        <div className='signup-modal-right'>
                        <iframe width="100%" height="100%"
                        src="https://player.vimeo.com/video/736253057?h=d178710954&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
                        allow="fullscreen; picture-in-picture;"
                        allowFullScreen
                        alt='How to use the website website and app, and book afforable home service providers.'
                        title="test player iframe vimeo" />
                        </div>
                    </Modal.Body>
                </CustomModal>
    )
}
export default VimeoModal;

const CustomModal=styled(Modal)`
.modal-content {
padding: 0rem;
height:300px;
}
`

