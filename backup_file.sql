--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: set_registration_date(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.set_registration_date() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
NEW.registration_date := CURRENT_DATE;
RETURN NEW;
END;
$$;


ALTER FUNCTION public.set_registration_date() OWNER TO postgres;

--
-- Name: update_section_article_count(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_section_article_count() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
UPDATE sections
SET article_count = (
SELECT COUNT(*)
FROM articles
WHERE articles.section_id = NEW.section_id
)
WHERE sections.id = NEW.section_id;
RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_section_article_count() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: accounts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.accounts (
    accid integer NOT NULL,
    login character varying(255),
    password character varying(255),
    code character(11),
    registration_date date,
    latest_ip character varying(15),
    email character varying(255),
    telephone character varying(20)
);


ALTER TABLE public.accounts OWNER TO postgres;

--
-- Name: accounts_accid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.accounts_accid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.accounts_accid_seq OWNER TO postgres;

--
-- Name: accounts_accid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.accounts_accid_seq OWNED BY public.accounts.accid;


--
-- Name: articles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.articles (
    id integer NOT NULL,
    title character varying(255),
    article text,
    "time" timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    userid integer,
    filename character varying(255),
    ismain boolean,
    section_id integer
);


ALTER TABLE public.articles OWNER TO postgres;

--
-- Name: articles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.articles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.articles_id_seq OWNER TO postgres;

--
-- Name: articles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.articles_id_seq OWNED BY public.articles.id;


--
-- Name: reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reviews (
    id integer NOT NULL,
    rating integer,
    review_text text,
    user_id integer,
    CONSTRAINT reviews_rating_check CHECK (((rating >= 1) AND (rating <= 5)))
);


ALTER TABLE public.reviews OWNER TO postgres;

--
-- Name: export_reviews; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.export_reviews AS
 SELECT a.login,
    r.id,
    r.rating,
    r.review_text
   FROM (public.reviews r
     JOIN public.accounts a ON ((r.user_id = a.accid)));


ALTER VIEW public.export_reviews OWNER TO postgres;

--
-- Name: reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reviews_id_seq OWNER TO postgres;

--
-- Name: reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;


--
-- Name: sections; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sections (
    id integer NOT NULL,
    section character varying(255) NOT NULL,
    article_count integer DEFAULT 0
);


ALTER TABLE public.sections OWNER TO postgres;

--
-- Name: sections_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.sections_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sections_id_seq OWNER TO postgres;

--
-- Name: sections_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.sections_id_seq OWNED BY public.sections.id;


--
-- Name: accounts accid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts ALTER COLUMN accid SET DEFAULT nextval('public.accounts_accid_seq'::regclass);


--
-- Name: articles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articles ALTER COLUMN id SET DEFAULT nextval('public.articles_id_seq'::regclass);


--
-- Name: reviews id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);


--
-- Name: sections id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sections ALTER COLUMN id SET DEFAULT nextval('public.sections_id_seq'::regclass);


--
-- Data for Name: accounts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.accounts (accid, login, password, code, registration_date, latest_ip, email, telephone) FROM stdin;
31	Asas	N6t0	299-875-888	2024-03-11	192.168.43.1	ant.tka4enko.1909@yandex.ru	\N
35	Тестовый чел	123f	222-222-222	2024-03-12	192.168.43.134	a.vodyaraman@gmail.com	\N
2	Петроwitch	user1	607-798-723	2024-03-12	192.168.43.134	gihag41238@synclane.com	\N
1	Anton Saevskii	123	111-111-111	2002-04-05	192.168.43.134	a.vodyaraman@gmail.com	89086076627
40	123	123f	691-032-173	2024-03-17	192.168.43.1	edu.vodyaraman@gmail.com	\N
41	Fedya	456g	918-107-029	2024-03-18	192.168.43.1	vodyaraman@gmail.com	\N
42	Русский	qwer4	242-563-663	2024-03-20	192.168.43.1	vodyaraman@gmail.com	\N
43	dyadya	123f	037-177-544	2024-03-23	192.168.43.134	vodyaraman@gmail.com	\N
44	SELEC	123f	882-491-698	2024-03-29	192.168.43.134	vodyaraman@gmail.com	\N
\.


--
-- Data for Name: articles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.articles (id, title, article, "time", userid, filename, ismain, section_id) FROM stdin;
76	Новый пост! 	Крутой пост! 	2024-03-08 17:11:17.97673	2	file-1709907076808-807530116.JPG	t	3
67	Внимание!	вас понюхали	2024-02-24 14:28:20.972682	2	file-1708774100872-872644492.jpg	f	1
6	О чём этот сайт?	Этот сайт существует и разрабатывается с целью продемонстрировать, а также отточить навыки владения стеком веб-разработки. Сайт является одновременно и портфолио и его на данный момент единственным экземпляром! Я надеюсь, в будущем этот сайт будет моей визитной карточкой.	2024-02-13 17:35:38.517452	2	\N	t	2
59	Лесная сторожка	Скрипело, свистало и выло в лесу,\nИ гром ударял в отдаленье, как молот,\nИ тучи рвались в небесах, но внизу\nЦарили затишье, и сумрак, и холод.\nВ гигантском колодце сосновых стволов,\nВ своей одинокой убогой сторожке\nЛесник пообедал и хлебные крошки\nСмахнул на ладонь, молчалив и суров.\nНад миром великая буря ходила,\nНо здесь, в тишине, у древесных корней,\nСтарик, отдыхая, не думал о ней,\nИ только собака ворчала уныло\nНа каждую вспышку далеких зарниц,\nИ в гнездах смолкало селение птиц.\n\nОднажды в грозу, навалившись на двери,\nТут зверь появился, высок и космат,\nИ так же, как многие прочие звери,\nУзнав человека, отпрянул назад.\nИ сторож берданку схватил, и с окошка\nПружиной метнулась под лестницу кошка,\nИ разом короткий ружейный удар\nПотряс основанье соснового бора.\n\nВернувшись, лесник успокоился скоро:\nОн, видимо, был уж достаточно стар,\nОн знал, что покой — только призрак покоя,\nОн знал, что, когда полыхает гроза,\nВсе тяжко-животное, злобно-живое\nВстает и глядит человеку в глаза.	2024-02-23 17:05:09.288614	2	file-1708697109136-752294588.jpg	f	2
78	Title turtle 	Da!\n	2024-03-11 12:15:44.570002	2	file-1710148543554-425801090.jpeg	f	3
83	Еще кока? 	Кокааа!!!	2024-03-22 18:35:27.331821	1	file-1711121726503-286216557.JPG	t	\N
74	Чилибоня		2024-03-02 17:10:04.419442	2	file-1709388604274-802715589.jpg	f	3
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reviews (id, rating, review_text, user_id) FROM stdin;
101	5	Привет! Я очень устал, но я почти доделал всё, что запланировал, а поэтому сайт - пушка!	35
102	1	Тестирую	35
104	3	Тестирую ещё раз!	35
105	3	Тестирую!	35
106	3	Случайный такой обзор от Тестового Чела	1
107	3	123	1
108	2	12	1
109	5	Добрейший вечерочек! Вы уже починили телеграм-бота?	1
110	5	Cool	40
111	5	Восхитительно	41
112	5	Круто! 	1
113	5	Проверка	1
114	4	Обзор	1
115	5	2	1
116	5	Плохо	1
16	4	Nice Cock Man	1
117	5	Привет! Я - Бот	1
23	3	Отзыв номер хрен пойми какой	1
25	3	Камушек	1
58	3	3/5 boobs	1
97	5	Кетчуп вкусный, товар рекомендую 	1
100	5	Всегда мечтал оставить полноценный отзыв об этом сайте! Начнём с того, что в данный момент я еле печатаю, потому что сайт ужасно оптимизирован. Это, конечно же, минус, но зато на сайте плывут красивые облачка и данные о пользователе отправляются с сервера аж три раза! Я больше всего люблю использовать русский язык со светлой темой или же английский язык с тёмной темой. Надеюсь, автор когда-нибудь уже сделает нормальные шрифты у приложения. Если я до сих пор отображаюсь в виде айдишника, то знай, что разработчик сайта, который сидит в сарае на цепи, всё-таки сбежал в туалет.	35
\.


--
-- Data for Name: sections; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sections (id, section, article_count) FROM stdin;
1	Работа с базами данных	1
2	Работа с картинками	3
3	Работа с аниме	3
4	С главной страницы	1
\.


--
-- Name: accounts_accid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.accounts_accid_seq', 44, true);


--
-- Name: articles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.articles_id_seq', 98, true);


--
-- Name: reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reviews_id_seq', 117, true);


--
-- Name: sections_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.sections_id_seq', 4, true);


--
-- Name: accounts accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (accid);


--
-- Name: articles articles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_pkey PRIMARY KEY (id);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- Name: sections sections_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sections
    ADD CONSTRAINT sections_pkey PRIMARY KEY (id);


--
-- Name: articles articles_update_section_count_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER articles_update_section_count_trigger AFTER INSERT OR DELETE OR UPDATE ON public.articles FOR EACH ROW EXECUTE FUNCTION public.update_section_article_count();


--
-- Name: accounts registration_date_trigger; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER registration_date_trigger BEFORE INSERT ON public.accounts FOR EACH ROW EXECUTE FUNCTION public.set_registration_date();


--
-- Name: articles articles_section_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_section_id_fkey FOREIGN KEY (section_id) REFERENCES public.sections(id);


--
-- Name: reviews fk_user_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES public.accounts(accid);


--
-- PostgreSQL database dump complete
--

