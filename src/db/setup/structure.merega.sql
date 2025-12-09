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
-- Name: board_messages pk_board_messages; Type: CONSTRAINT; Schema: public; Owner: merega
--

ALTER TABLE ONLY public.board_messages
    ADD CONSTRAINT pk_board_messages PRIMARY KEY (message_id);


--
-- Name: sk_board_messages_net; Type: INDEX; Schema: public; Owner: merega
--

CREATE INDEX sk_board_messages_net ON public.board_messages USING btree (net_id);


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
