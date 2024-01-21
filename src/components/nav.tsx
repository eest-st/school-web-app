import { ArchiveX, File, Inbox, Send, Trash2 } from 'lucide-react';

const LINKS = [
  {
    title: 'Inicio',
    icon: Inbox,
    variant: 'default',
  },
  {
    title: 'Alumnos',
    icon: File,
    variant: 'ghost',
  },
  {
    title: 'Profesores',
    icon: Send,
    variant: 'ghost',
  },
  {
    title: 'Cursos',
    icon: ArchiveX,
    variant: 'ghost',
  },
  {
    title: 'Materias',
    icon: Trash2,
    variant: 'ghost',
  },
];

export function Nav() {
  return (
    <div className='group flex flex-col gap-4 p-2 data-[collapsed=true]:py-2 min-w-[140px] border border-r-gray-200'>
      <nav className='grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2'>
        {LINKS.map((link, index) => (
          <a
            key={index}
            href='#'
            className='flex py-2 font-light justify-start items-center text-[#79767B]'
          >
            <link.icon className='mr-2 h-4 w-4' />
            {link.title}
          </a>
        ))}
      </nav>
    </div>
  );
}
