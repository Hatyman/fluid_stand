import { FC, memo, useState } from 'react';
import { StageIndicator } from 'pages/main/components/StageIndicator';
import s from './ProcessState.module.sass';

enum ProcessStateEnum {
  Off,
  FirstStage,
  SecondStage,
  ThirdStage,
}

const stageDescription: Record<ProcessStateEnum, string> = {
  [ProcessStateEnum.Off]: 'Технологический процесс остановлен',
  [ProcessStateEnum.FirstStage]: 'Поддержание заданного уровня жидкости в первом резервуаре',
  [ProcessStateEnum.SecondStage]: 'Поддержание заданного давления жидкости во втором резервуаре',
  [ProcessStateEnum.ThirdStage]:
    'Поддержание давления во втором резервуаре через первый с ограничением уровня жидкости в первом',
};

export const ProcessState: FC = memo(function ProcessState() {
  const [stage, setStage] = useState<ProcessStateEnum>(ProcessStateEnum.SecondStage);

  return (
    <div className={s.container}>
      {Object.keys(ProcessStateEnum).map(x => {
        const enumItem = Number(x);
        if (isNaN(enumItem) || enumItem === ProcessStateEnum.Off) return null;

        return <StageIndicator isActive={enumItem <= stage} key={x} />;
      })}
      <p className={s.description}>{stageDescription[stage]}</p>
    </div>
  );
});
