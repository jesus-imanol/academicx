import { useLanguage } from '../../contexts/LanguageContext';
import Icon from '../atoms/Icon';

const LanguageSelector = () => {
  const { language, changeLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
      <Icon name="language" className="text-white/70 text-lg" />
      <select
        value={language}
        onChange={(e) => changeLanguage(e.target.value)}
        className="bg-transparent text-white text-sm font-medium outline-none cursor-pointer"
      >
        <option value="en" className="bg-[#252233] text-white">English</option>
        <option value="es" className="bg-[#252233] text-white">Español</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
