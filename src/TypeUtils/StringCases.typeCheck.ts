import type { TestType } from '../typeTesting.types';

import type { PascalCase } from './StringCases.types';

type _PascalCase_1 = TestType<PascalCase<'the quick brown fox'>, 'TheQuickBrownFox', true>;
type _PascalCase_2 = TestType<PascalCase<'the quick brown fox'>, 'TheQuickbrownFox', false>;
