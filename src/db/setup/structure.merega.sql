CREATE TABLE public.board_messages (
    message_id bigint NOT NULL,
    net_id bigint NOT NULL,
    member_id bigint NOT NULL,
    message character varying(255) NOT NULL,
    date timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.board_messages OWNER TO merega;

--
-- Name: board_messages_message_id_seq; Type: SEQUENCE; Schema: public; Owner: merega
--

ALTER TABLE public.board_messages ALTER COLUMN message_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.board_messages_message_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

--
-- Name: events; Type: TABLE; Schema: public; Owner: merega
--

CREATE TABLE public.events (
    event_id bigint NOT NULL,
    user_id bigint NOT NULL,
    net_id bigint,
    net_view character(10) DEFAULT NULL::bpchar,
    from_node_id bigint,
    event_type character(20) NOT NULL,
    message character varying(255) NOT NULL,
    date timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.events OWNER TO merega;

--
-- Name: events_event_id_seq; Type: SEQUENCE; Schema: public; Owner: merega
--

ALTER TABLE public.events ALTER COLUMN event_id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.events_event_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

--
-- Name: users_events; Type: TABLE; Schema: public; Owner: merega
--

CREATE TABLE public.users_events (
    user_id bigint NOT NULL,
    notification_date timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users_events OWNER TO merega;


--
-- Name: board_messages pk_board_messages; Type: CONSTRAINT; Schema: public; Owner: merega
--

ALTER TABLE ONLY public.board_messages
    ADD CONSTRAINT pk_board_messages PRIMARY KEY (message_id);


--
-- Name: events pk_events; Type: CONSTRAINT; Schema: public; Owner: merega
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT pk_events PRIMARY KEY (event_id);


--
-- Name: users_events pk_users_events; Type: CONSTRAINT; Schema: public; Owner: merega
--

ALTER TABLE ONLY public.users_events
    ADD CONSTRAINT pk_users_events PRIMARY KEY (user_id);


--
-- Name: sk_board_messages_net; Type: INDEX; Schema: public; Owner: merega
--

CREATE INDEX sk_board_messages_net ON public.board_messages USING btree (net_id);


--
-- Name: sk_events_user; Type: INDEX; Schema: public; Owner: merega
--

CREATE INDEX sk_events_user ON public.events USING btree (user_id);


--
-- Name: board_messages fk_board_messages_member; Type: FK CONSTRAINT; Schema: public; Owner: merega
--

ALTER TABLE ONLY public.board_messages
    ADD CONSTRAINT fk_board_messages_member FOREIGN KEY (member_id) REFERENCES public.members(member_id) ON DELETE CASCADE;


--
-- Name: board_messages fk_board_messages_net; Type: FK CONSTRAINT; Schema: public; Owner: merega
--

ALTER TABLE ONLY public.board_messages
    ADD CONSTRAINT fk_board_messages_net FOREIGN KEY (net_id) REFERENCES public.nets(net_id);


--
-- Name: events fk_events_from_node; Type: FK CONSTRAINT; Schema: public; Owner: merega
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT fk_events_from_node FOREIGN KEY (from_node_id) REFERENCES public.nodes(node_id) ON DELETE CASCADE;


--
-- Name: events fk_events_net; Type: FK CONSTRAINT; Schema: public; Owner: merega
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT fk_events_net FOREIGN KEY (net_id) REFERENCES public.nets(net_id);


--
-- Name: events fk_events_user; Type: FK CONSTRAINT; Schema: public; Owner: merega
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT fk_events_user FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- Name: users_events fk_users_events_user; Type: FK CONSTRAINT; Schema: public; Owner: merega
--

ALTER TABLE ONLY public.users_events
    ADD CONSTRAINT fk_users_events_user FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;
