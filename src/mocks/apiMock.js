import certification from './certification.json';
import projects from './projects.json';
import skills from './skills.json';

const handleEmptyData = (data, dataType) => {
    if (Object.keys(data).length === 0) {
        throw new Error(`${dataType} data is empty`);
    }
    return data;
};

export const fetchEducationalData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve(handleEmptyData(certification, 'Certification'));
            } catch (error) {
                reject(error.message);
            }
        }, 500);
    });
};

export const fetchProjectsData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve(handleEmptyData(projects, 'Projects'));
            } catch (error) {
                reject(error.message);
            }
        }, 500);
    });
};

export const fetchSkillsData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve(handleEmptyData(skills, 'Skills'));
            } catch (error) {
                reject(error.message);
            }
        }, 500);
    });
};