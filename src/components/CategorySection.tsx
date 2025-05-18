
import { Link } from 'react-router-dom';
import { categories } from '@/lib/data';

const CategorySection = () => {
  return (
    <section className="py-10 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Shop By Category</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              to={`/products?category=${category.name}`}
              className="group"
            >
              <div className="bg-white rounded-lg shadow-md overflow-hidden text-center transition-transform hover:shadow-lg hover:-translate-y-1">
                <div className="h-32 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-gray-800">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
