import Dashboard from '@components/dashboard';
import ManageUser from '@components/manage-user';
import NavBarAdmin from '@components/navbar-admin';
import { usePost } from '@store/post/post.selector';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { WrapperStyled } from './styled';
import AdminPost from '@components/admin-post';
import CrawlViecLam24h from '@components/crawl/vieclam24h';
import JobOpportunity from '@components/job-opportunity';
import CrawlFacebook from '@components/crawl/facebook';

const Admin = () => {
  const { onGetAllCrawlPost } = usePost();
  const [content, setContent] = useState<ReactNode>(null);
  const [menuId, setMenuId] = useState<string>('dashboard');
  useEffect(() => {
    onGetAllCrawlPost();
  }, []);
  const handleRenderContent = useCallback(() => {
    switch (menuId) {
      case 'dashboard':
        setContent(<Dashboard />);
        break;
      case '1':
        setContent(<ManageUser />);
        break;
      case '2':
        setContent(<AdminPost />);
        break;
      case '3':
        setContent(<p>VietnamSalary</p>);
        break;
      case '4':
        setContent(<JobOpportunity />);
        break;
      case '5':
        setContent(<CrawlFacebook />);
        break;
      case '6':
        setContent(<CrawlViecLam24h />);
        break;
      case '7':
        setContent(<p>Topdev</p>);
        break;
      case '8':
        setContent(<p>Giao dich</p>);
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
        <NavBarAdmin setMenuId={setMenuId} />
      </div>
      <div className="content">{content}</div>
    </WrapperStyled>
  );
};

export default Admin;
