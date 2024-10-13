import { Input } from '@/components/ui/input';

export default function ImageForm() {
    return (
        <div>
            <form action=''>
                <Input type='file' name='image' />
            </form>
        </div>
    );
}
