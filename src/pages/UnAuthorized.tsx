import { Button } from '@/components/ui/button';
import { useLocation, useNavigate } from 'react-router-dom';

export default function UnAuthorized() {
  const navigate = useNavigate();
  const location = useLocation();
  const handleNavigate = () => {
    navigate('/');
  }
    return (
        <div>
            <h1>Unauthorized</h1>
            <p>You do not have permission to access this page.</p>
            <Button variant={'destructive'}
            onClick={handleNavigate}
            >Retroceder</Button>
        </div>
    );
}
