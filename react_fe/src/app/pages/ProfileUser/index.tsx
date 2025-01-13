import EditInfo from '@components/edit-info';
import EditSkill from '@components/edit-skill';
import NavBarUser from '@components/navbar-user';
import PostSave from '@components/post-save';
import { useUser } from '@store/user/user.selector';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { WrapperStyled } from './styled';
import JobOpportunity from '@components/job-opportunity';
const ProfileUser = () => {
  const { onGetUserSavePost } = useUser();
  const [content, setContent] = useState<ReactNode>(null);
  const [menuId, setMenuId] = useState<string>('1');
  const handleRenderContent = useCallback(() => {
    switch (menuId) {
      case '1':
        setContent(<EditInfo />);
        break;
      case '2':
        setContent(<EditSkill />);
        break;
      case '3':
        setContent(<p>Vietnam Salary</p>);
        break;
      case '4':
        setContent(<JobOpportunity />);
        break;
      case '5':
        onGetUserSavePost();
        setContent(<PostSave />);
        break;
      default:
        break;
    }
  }, [menuId]);
  useEffect(() => {
    handleRenderContent();
  }, [menuId]);
  return (
    <WrapperStyled>
      <div className="menu">
        <NavBarUser setMenuId={setMenuId} />
      </div>
      <div className="content">{content}</div>
    </WrapperStyled>
  );
};

export default ProfileUser;
