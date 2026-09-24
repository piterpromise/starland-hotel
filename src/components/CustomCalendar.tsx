import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import '../styles/index.css';

interface CustomCalendarProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectDates: (startDate: string, endDate: string) => void;
    initialStartDate?: string;
    initialEndDate?: string;
}

const MONTH_NAMES = [
    'JANVIER', 'FÉVRIER', 'MARS', 'AVRIL', 'MAI', 'JUIN',
    'JUILLET', 'AOÛT', 'SEPTEMBRE', 'OCTOBRE', 'NOVEMBRE', 'DÉCEMBRE'
];

const WEEKDAY_NAMES = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

export default function CustomCalendar({
    isOpen,
    onClose,
    onSelectDates,
    initialStartDate = '',
    initialEndDate = ''
}: CustomCalendarProps) {
    const today = new Date();
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());

    const [selectedStart, setSelectedStart] = useState<Date | null>(
        initialStartDate ? new Date(initialStartDate) : null
    );
    const [selectedEnd, setSelectedEnd] = useState<Date | null>(
        initialEndDate ? new Date(initialEndDate) : null
    );
    const [activePreset, setActivePreset] = useState<string>('');

    if (!isOpen) return null;

    const handlePrevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    const formatDateString = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleDayClick = (dayDate: Date) => {
        setActivePreset('');
        if (!selectedStart || (selectedStart && selectedEnd)) {
            setSelectedStart(dayDate);
            setSelectedEnd(null);
        } else if (selectedStart && !selectedEnd) {
            if (dayDate < selectedStart) {
                setSelectedStart(dayDate);
                setSelectedEnd(null);
            } else {
                setSelectedEnd(dayDate);
            }
        }
    };

    // Quick presets
    const handlePresetSelect = (presetKey: string) => {
        setActivePreset(presetKey);
        const now = new Date();
        now.setHours(0, 0, 0, 0);

        if (presetKey === 'today') {
            setSelectedStart(now);
            setSelectedEnd(now);
        } else if (presetKey === 'tomorrow') {
            const tomorrow = new Date(now);
            tomorrow.setDate(now.getDate() + 1);
            setSelectedStart(tomorrow);
            setSelectedEnd(tomorrow);
        } else if (presetKey === 'this_week') {
            const endOfWeek = new Date(now);
            endOfWeek.setDate(now.getDate() + (7 - now.getDay()));
            setSelectedStart(now);
            setSelectedEnd(endOfWeek);
        } else if (presetKey === 'next_weekend') {
            const nextSat = new Date(now);
            nextSat.setDate(now.getDate() + ((6 - now.getDay() + 7) % 7 || 7));
            const nextSun = new Date(nextSat);
            nextSun.setDate(nextSat.getDate() + 1);
            setSelectedStart(nextSat);
            setSelectedEnd(nextSun);
        } else if (presetKey === 'this_month') {
            const startMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            const endMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
            setSelectedStart(startMonth);
            setSelectedEnd(endMonth);
        } else if (presetKey === 'next_month') {
            const startNext = new Date(now.getFullYear(), now.getMonth() + 1, 1);
            const endNext = new Date(now.getFullYear(), now.getMonth() + 2, 0);
            setCurrentMonth(startNext.getMonth());
            setCurrentYear(startNext.getFullYear());
            setSelectedStart(startNext);
            setSelectedEnd(endNext);
        }
    };

    const isSameDay = (d1: Date | null, d2: Date | null) => {
        if (!d1 || !d2) return false;
        return (
            d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate()
        );
    };

    const isInRange = (d: Date) => {
        if (!selectedStart || !selectedEnd) return false;
        return d > selectedStart && d < selectedEnd;
    };

    // Days grid calculation
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    
    // Day of week index (Monday = 0, Sunday = 6)
    let startDayOfWeek = firstDayOfMonth.getDay() - 1;
    if (startDayOfWeek === -1) startDayOfWeek = 6;

    const daysInMonth = lastDayOfMonth.getDate();
    const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

    const calendarGrid: { date: Date; isCurrentMonth: boolean }[] = [];

    // Prev month padding
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
        const d = new Date(currentYear, currentMonth - 1, daysInPrevMonth - i);
        calendarGrid.push({ date: d, isCurrentMonth: false });
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
        const d = new Date(currentYear, currentMonth, day);
        calendarGrid.push({ date: d, isCurrentMonth: true });
    }

    // Next month padding to complete grid
    const remainingCells = (7 - (calendarGrid.length % 7)) % 7;
    for (let day = 1; day <= remainingCells; day++) {
        const d = new Date(currentYear, currentMonth + 1, day);
        calendarGrid.push({ date: d, isCurrentMonth: false });
    }

    const handleConfirm = () => {
        if (selectedStart) {
            const startStr = formatDateString(selectedStart);
            const endStr = selectedEnd ? formatDateString(selectedEnd) : startStr;
            onSelectDates(startStr, endStr);
            onClose();
        }
    };

    return (
        <div className="custom-calendar-overlay" onClick={onClose}>
            <div className="custom-calendar-card" onClick={(e) => e.stopPropagation()}>
                <div className="custom-calendar-body">
                    {/* Left Sidebar Presets */}
                    <div className="custom-calendar-sidebar">
                        <span className="sidebar-title">Raccourcis</span>
                        <button 
                            className={`preset-btn ${activePreset === 'today' ? 'active' : ''}`}
                            onClick={() => handlePresetSelect('today')}
                        >
                            Aujourd'hui
                        </button>
                        <button 
                            className={`preset-btn ${activePreset === 'tomorrow' ? 'active' : ''}`}
                            onClick={() => handlePresetSelect('tomorrow')}
                        >
                            Demain
                        </button>
                        <button 
                            className={`preset-btn ${activePreset === 'this_week' ? 'active' : ''}`}
                            onClick={() => handlePresetSelect('this_week')}
                        >
                            Cette semaine
                        </button>
                        <button 
                            className={`preset-btn ${activePreset === 'next_weekend' ? 'active' : ''}`}
                            onClick={() => handlePresetSelect('next_weekend')}
                        >
                            Week-end prochain
                        </button>
                        <button 
                            className={`preset-btn ${activePreset === 'this_month' ? 'active' : ''}`}
                            onClick={() => handlePresetSelect('this_month')}
                        >
                            Ce mois-ci
                        </button>
                        <button 
                            className={`preset-btn ${activePreset === 'next_month' ? 'active' : ''}`}
                            onClick={() => handlePresetSelect('next_month')}
                        >
                            Mois prochain
                        </button>
                    </div>

                    {/* Right Panel Calendar Grid */}
                    <div className="custom-calendar-main">
                        {/* Month Header Navigation */}
                        <div className="calendar-header">
                            <button className="cal-nav-btn" onClick={handlePrevMonth} aria-label="Mois précédent">
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </button>
                            <span className="cal-month-title">
                                {MONTH_NAMES[currentMonth]} {currentYear}
                            </span>
                            <button className="cal-nav-btn" onClick={handleNextMonth} aria-label="Mois suivant">
                                <FontAwesomeIcon icon={faChevronRight} />
                            </button>
                        </div>

                        {/* Weekday Names */}
                        <div className="calendar-weekdays">
                            {WEEKDAY_NAMES.map((wd, i) => (
                                <span key={i} className="weekday-col">{wd}</span>
                            ))}
                        </div>

                        {/* Days Grid */}
                        <div className="calendar-grid">
                            {calendarGrid.map((item, index) => {
                                const isStart = isSameDay(item.date, selectedStart);
                                const isEnd = isSameDay(item.date, selectedEnd);
                                const inRange = isInRange(item.date);
                                const isToday = isSameDay(item.date, today);

                                return (
                                    <button
                                        key={index}
                                        className={`cal-day-cell ${!item.isCurrentMonth ? 'other-month' : ''} ${isStart ? 'is-start' : ''} ${isEnd ? 'is-end' : ''} ${inRange ? 'in-range' : ''} ${isToday ? 'is-today' : ''}`}
                                        onClick={() => handleDayClick(item.date)}
                                    >
                                        <span>{item.date.getDate()}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Footer Selection summary & Confirm */}
                        <div className="calendar-footer">
                            <div className="selected-range-info">
                                {selectedStart ? (
                                    <span>
                                        {formatDateString(selectedStart)}
                                        {selectedEnd ? ` ➔ ${formatDateString(selectedEnd)}` : ' (Sélectionner départ)'}
                                    </span>
                                ) : (
                                    <span className="muted-text">Cliquez pour choisir une date</span>
                                )}
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button 
                                    className="btn btn--outline"
                                    onClick={onClose}
                                    style={{ padding: '10px 18px', fontSize: '0.9rem' }}
                                >
                                    Fermer
                                </button>
                                <button 
                                    className="btn btn--primary cal-confirm-btn"
                                    onClick={handleConfirm}
                                    disabled={!selectedStart}
                                >
                                    <FontAwesomeIcon icon={faCalendarCheck} /> Valider
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
