import { Button } from '@/components/ui/button';
import ImageForm from '@/features/admin-personal/ImageForm';
import { toast } from '@/hooks/use-toast';

export default function Dashboard() {
    return (
        <>
            <Button
                onClick={() => {
                    toast({
                        title: 'Scheduled: Catch up',
                        description: 'Friday, February 10, 2023 at 5:57 PM',
                    });
                }}>
                Click me
            </Button>
            <ImageForm />
        </>
    );
}
