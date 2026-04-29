# Aivio Business OS — Agent Instructions

## Product positioning

Aivio is not a CRM.
Aivio is an AI Business Operating System for small and medium businesses.

It unifies:
- clients
- messages
- sales
- tasks
- AI employees
- automations
- finance
- integrations

Core flow:
Message → AI analysis → Contact/Lead → Task/Deal → Finance insight.

## Language

All UI text must be in Russian.
Do not use English labels in the interface unless it is a brand name like Telegram, OpenRouter, Google, n8n, Make.

## Design style

Use premium AI minimalism:
- calm dark UI
- no cyberpunk
- no neon overload
- inspired by Linear, Stripe, Notion, Apple
- clean spacing
- strong hierarchy
- usable over flashy

## Tech stack

This is a React / TypeScript / Vite app.
Use existing project conventions.
Use shadcn/Radix components where appropriate.
Use Tailwind for styling.
Do not introduce unnecessary dependencies.

## Navigation naming

Use these product sections:

- Центр управления
- Клиенты
- Inbox
- AI-сотрудники
- Автоматизации
- Финансовый радар
- Интеграции
- Шаблоны
- Настройки

## Product layers

### Command Center
Main business cockpit:
- выручка
- активные сделки
- новые лиды
- конверсия
- задачи на сегодня
- последние события
- финансовые риски
- AI-рекомендации with action buttons

### Customer Layer
Clients, leads, deals, contacts, message history, sources, segments, AI client analysis.

### Communication Layer
Unified inbox:
Telegram, WhatsApp, Instagram, VK, Email, сайт-формы.

Every message should visually connect to:
- contact
- lead/deal
- AI analysis

### AI Agent Layer
AI employees:
- AI-квалификатор
- AI-саппорт
- AI-аналитик
- AI-финансист
- AI-ассистент руководителя

### Workflow Layer
Automation engine:
Trigger → Condition → Action.

Examples:
- новый лид → создать сделку
- нет ответа 24 часа → напомнить
- горячий клиент → уведомить менеджера
- сделка зависла → предложить действие

### Finance Layer
Financial Radar:
- доходы
- расходы
- прибыль
- баланс
- прогноз кассовых разрывов
- связь сделок с деньгами

### Integration Layer
Use these integrations:
Telegram, WhatsApp, Instagram, VK, Google Calendar, Google Sheets, Yandex, 1C, МойСклад, Bitrix24, OpenRouter, n8n, Make.

### Template Layer
Industry templates:
- Услуги
- Консалтинг
- Бьюти
- Ритейл
- Онлайн-образование
- Цветочный бизнес

Each template should include:
- воронка
- AI-промпты
- автоматизации
- интеграции

## Quality rules

Before finishing a task:
- run typecheck if available
- run lint if available
- run build if available
- keep components readable
- avoid large unrelated refactors
- do not remove existing working UI unless replacing it intentionally

## Review guidelines

Flag as high priority:
- English UI text where Russian is required
- broken navigation
- unused routes
- hardcoded misleading SaaS examples like Slack/Salesforce/HubSpot if they conflict with Aivio positioning
- UI that makes Aivio look like a generic CRM instead of Business OS
