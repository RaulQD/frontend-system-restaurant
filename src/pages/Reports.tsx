import DatePicker from '@/components/DatePicker';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table } from '@/components/ui/table';
import { BarChart, PieChart } from 'lucide-react';

export default function Reports() {

  const ventas =[
    {
        id: 1,
        fecha: '2021-09-01',
        empleado: 'Juan Perez',
        mesa: 'Mesa 1',
        total: 100,
        metodoPago: 'Efectivo',
    },
    {
        id: 2,
        fecha: '2021-09-01',
        empleado: 'Juan Perez',
        mesa: 'Mesa 1',
        total: 100,
        metodoPago: 'Efectivo',
    },
    {
        id: 3,
        fecha: '2021-09-01',
        empleado: 'Juan Perez',
        mesa: 'Mesa 1',
        total: 100,
        metodoPago: 'Efectivo',
    },
    {
        id: 4,
        fecha: '2021-09-01',
        empleado: 'Juan Perez',
        mesa: 'Mesa 1',
        total: 100,
        metodoPago: 'Efectivo',
    },
    {
        id: 5,
        fecha: '2021-09-01',
        empleado: 'Juan Perez',
        mesa: 'Mesa 1',
        total: 100,
        metodoPago: 'Efectivo',
    },
    {
        id: 6,
        fecha: '2021-09-01',
        empleado: 'Juan Perez',
        mesa: 'Mesa 1',
        total: 100,
        metodoPago: 'Efectivo',
    },
    {
        id: 7,
        fecha: '2021-09-01',
        empleado: 'Juan Perez',
        mesa: 'Mesa 1',
        total: 100,
        metodoPago: 'Efectivo',
    },
    {
        id: 8,
        fecha: '2021-09-01',
        empleado: 'Juan Perez',
        mesa: 'Mesa 1',
        total: 100,
        metodoPago: 'Efectivo',
    },
    {
        id: 9,
        fecha: '2021-09-01',
        empleado: 'Juan Perez',
        mesa: 'Mesa 1',
        total: 100,
        metodoPago: 'Efectivo',
    },
    {
        id: 10,
        fecha: '2021-09-01',
        empleado: 'Juan Perez',
        mesa: 'Mesa',
        total: 100,
        metodoPago: 'Efectivo',
    },
  ]

    const onValueChange = (value) => {};
    return (
        <>
            <div className='flex justify-between items-center p-4 bg-white shadow'>
                <h2 className='text-xl font-semibold'>Reporte de Ventas</h2>
                <div className='flex space-x-4'>
                    <DatePicker text='Desde' onDateChange={onValueChange} />
                    <DatePicker text='Hasta' onDateChange={onValueChange} />
                    {/* <Select onselect={['Hoy', 'Semana', 'Mes']} /> */}
                    {/* <Select options={['Todos', 'Efectivo', 'Tarjeta']} /> */}
                    <Button>Filtrar</Button>
                </div>
            </div>
            <div className='grid grid-cols-2 gap-4 p-4'>
                <Card>
                    <h3 className='text-lg font-semibold'>Ventas por Día</h3>
                    <BarChart />
                </Card>
                <Card>
                    <h3 className='text-lg font-semibold'>Métodos de Pago</h3>
                    <PieChart />
                </Card>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Empleado</th>
                        <th>Mesa</th>
                        <th>Total</th>
                        <th>Método de Pago</th>
                    </tr>
                </thead>
                <tbody>
                    {ventas.map((venta) => (
                        <tr key={venta.id}>
                            <td>{venta.fecha}</td>
                            <td>{venta.empleado}</td>
                            <td>{venta.mesa}</td>
                            <td>{venta.total}</td>
                            <td>{venta.metodoPago}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
}
