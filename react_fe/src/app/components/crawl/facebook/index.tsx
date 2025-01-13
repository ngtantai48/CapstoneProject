import { Button } from 'antd';
import { WrapperStyled } from './styled';
import { useSocket } from '@socket';
import { useCallback, useEffect, useState } from 'react';
import { useCrawl } from '@store/crawl/crawl.selector';
import classNames from 'classnames';
import { LoadingOutlined } from '@ant-design/icons';

const CrawlFacebook = () => {
  const { socket } = useSocket();
  const { onCrawlFacebook } = useCrawl();
  const [status, setStatus] = useState('');
  const [isPending, setIsPending] = useState(false);
  const onClickCrawlData = useCallback(() => {
    setIsPending(true);
    onCrawlFacebook();
  }, [socket]);
  const [logs, setLogs] = useState<string[]>([]);

  const handleCurrentStatus = useCallback((status: string) => {
    console.log(status);
    if (status === 'PROCESSING') {
      setIsPending(false);
    }
    setStatus(status);
  }, []);

  const handleLog = useCallback((message: string) => {
    console.log('log::', message);
    setLogs((prev: string[]) => [...prev, message]);
  }, []);

  const handleStatus = useCallback((status: string) => {
    setStatus(status);
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.emit('current_status');

    socket.on('current_status', handleCurrentStatus);
    socket.on('log_fb', handleLog);
    socket.on('status', handleStatus);

    return () => {
      socket.off('current_status', handleCurrentStatus);
      socket.off('log_fb', handleLog);
      socket.off('status', handleStatus);
    };
  }, []);
  return (
    <WrapperStyled>
      <h2>Crawl facebook</h2>
      <div className="container">
        <div className="toolbar">
          <p
            className={classNames('status', {
              ready: status === 'READY',
              processing: status === 'PROCESSING',
            })}>
            {status || <LoadingOutlined />}
          </p>
          <Button
            onClick={onClickCrawlData}
            disabled={status === 'PROCESSING' || isPending}
            loading={isPending}
            className="trigger">
            Crawl data
          </Button>
        </div>
        <div className="console">
          {logs.map((log, index) => {
            return (
              <p
                key={index}
                className="log">
                {log}
              </p>
            );
          })}
        </div>
      </div>
    </WrapperStyled>
  );
};

export default CrawlFacebook;
